from flask import Blueprint, request, session, render_template, jsonify
from app.models import db, Playlist, User, Song, Album, Artist
from flask_login import current_user, login_required, login_user, logout_user
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename
from werkzeug.utils import secure_filename
from sqlalchemy.sql import func
from ..forms import PlaylistForm
import boto3
import botocore
import os

playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route("/pictures/upload", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Playlist(user=current_user, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

# @playlist_routes.route("/pictures/upload", methods=["POST"])
# def upload_picture():
#     if request.method == "POST":
#         img = request.files["file"]
#         if img:
#             filename = secure_filename(img.filename)
#             s3.upload_fileobj(
#                 img,
#                 BUCKET_NAME,
#                 filename,
#                 ExtraArgs = {
#                     'ACL':'public-read',
#                     'ContentType': img.content_type
#                 }
#             )
#             return {"picture": f"https://amplifyproj.s3.amazonaws.com/{filename}"}
#         else:
#             return {"error": "Not a valid file"}

# @playlist_routes.route("/upload")
# def uploading():
#     return render_template("imgupload.html")

# Get all playlists

@playlist_routes.route("/")
def get_playlists():
    get_playlists = Playlist.query.all()
    playlistsdict = [playlist.to_dict(user=True) for playlist in get_playlists]
    return {"Playlists": playlistsdict}

# Get one specific playlist

@playlist_routes.route("/<int:playlistId>/")
def get_a_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    if playlist:
        playlistdict = playlist.to_dict(user=True, songs=True)
        return playlistdict
    else:
        return {"note": f"Playlist with the id of {playlistId} was not able to be found"}

# Create playlist

@playlist_routes.route("/", methods=["POST"])
@login_required
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlist_picture = form.data['playlist_picture']
        playlist_picture.filename = get_unique_filename(playlist_picture.filename)

        upload = upload_file_to_s3(playlist_picture)

        if 'url' not in upload:
            return render_template("imgupload.html", form=form, errors=[upload])

        new_playlist = Playlist(
            creator_id = form.data['creator_id'],
            title = form.data['title'],
            description = form.data['description'],
            # playlist_picture = form.data['playlist_picture']
            playlist_picture=upload['url']
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict(user=True)
    else:
        return form.errors

# Get followers of a playlist

@playlist_routes.route("/<int:playlistId>/playlist-followers")
def playlist_followers(playlistId):
    playlist = Playlist.query.get(playlistId)

    if playlist:
        return playlist.to_dict(playlistFollowers=True)
    else:
        return {"note": f"Playlist {playlistId} you were looking for could not be located"}

# Add a song to a playlist

@playlist_routes.route("/<int:playlistId>/insertsong/<int:songId>", methods=["POST"])
@login_required
def insertsong_to_playlist(playlistId, songId):
    song = Song.query.get(songId)
    playlist = Playlist.query.get(playlistId)
    if playlist:
        if song:
            if current_user.id == playlist.creator_id:
                playlist.playlist_song_inventory.append(song)
                db.session.commit()
                return playlist.to_dict(songs=True)
            else:
                return {"note": "You're only able to add songs to a playlist that you own."}
        else:
            return {"note": f"The song with the id of {songId} was not found"}
    else:
        return {"note": f"The playlist with the id of {playlistId} was not found"}

# Edit a playlist

@playlist_routes.route("/<int:playlistId>/", methods=["PUT"])
@login_required
def edit_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    # if not playlist:
    #     return {"errors": ["Playlist couldn't be found"]}, 404

    # form = PlaylistForm()
    # form["csrf_token"].data = request.cookies["csrf_token"]

    # if playlist and form.validate_on_submit():
    #     if current_user.id == playlist.creator_id:
    #         playlist.title = request.get_json()["title"]
    #         playlist.description = request.get_json()["description"]
    #         playlist.playlist_picture = request.get_json()["playlist_picture"]
    #         db.session.commit()
    #         return playlist.to_dict(user=True)
    updated_title = request.json["title"]
    updated_description = request.json["description"]
    updated_picture  = request.json["playlist_picture"]

    if playlist:
        if playlist.creator_id == current_user.id:
            if updated_title:
                playlist.title = updated_title
            else:
                playlist.title = playlist.title
            if updated_description:
                playlist.description = updated_description
            else:
                playlist.description = playlist.description
            if updated_picture:
                playlist.playlist_picture = updated_picture
            else:
                playlist.playlist_picture = playlist.playlist_picture
            db.session.commit()
            return playlist.to_dict(user=True, picture=True)
        else:
            return {"note": "You're not able to edit a playlist that you do not own"}
    else:
        return {"note": "No such playlist was found"}
    # if form.errors:
    #     return form.errors


# Delete a song from a playlist

@playlist_routes.route("/<int:playlistId>/removesong/<int:songId>", methods=['DELETE'])
@login_required
def deletesong_from_playlist(playlistId, songId):
    song = Song.query.get(songId)
    playlist = Playlist.query.get(playlistId)
    if playlist:
        if song:
            if current_user.id == playlist.creator_id:
                playlist.playlist_song_inventory.remove(song)
                db.session.commit()
                return playlist.to_dict(songs=True)
            else:
                return {"note": "Not able to delete songs from a playlist that is not owned by you"}
        else:
            return {"note": f"The song with the id of {songId} was not found"}
    else:
        return {"note": f"The playlist with the id of {playlistId} was not found"}

# Delete a playlist

@playlist_routes.route("/<int:playlistId>/", methods=["DELETE"])
@login_required
def delete_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    if playlist:
        if current_user.id == playlist.creator_id:
            db.session.delete(playlist)
            db.session.commit()
            return {"note": "You have successfully deleted your playlist"}
        else:
            return {"note": "Not able to delete a playlist that is not owned by you"}
    else:
        return {"note": f"Playlist with the id of {playlistId} was not found"}
