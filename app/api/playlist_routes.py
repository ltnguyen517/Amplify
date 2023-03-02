from flask import Blueprint, request, session, render_template, jsonify
from app.models import db, Playlist, User, Song, Album
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.utils import secure_filename
from sqlalchemy.sql import func
from ..forms import PlaylistForm
import boto3
import botocore
import os

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

playlist_routes = Blueprint("playlists", __name__)

@playlist_routes.route("/pictures/upload", methods=["POST"])
def upload_picture():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            filename = secure_filename(file.filename)
            s3.upload_fileobj(
                file,
                BUCKET_NAME,
                filename,
                ExtraArgs = {
                    'ACL':'public-read',
                    'ContentType': file.content_type
                }
            )
            return {"picture": f"http://amplifyproj.s3.amazonaws.com/{filename}"}
        else:
            return {"error": "Not a valid file"}


# Get all playlists

@playlist_routes.route("/")
def get_playlists():
    get_playlists = Playlist.query.all()
    playlistsdict = [play.to_dict(user=True) for play in get_playlists]
    return {"Playlists": playlistsdict}

# Get one specific playlist

@playlist_routes.route("/<int:playlistId>")
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
        new_playlist = Playlist(
            creator_id = form.data['creator_id'],
            title = form.data['title'],
            description = form.data['description'],
            playlist_picture = form.data['playlist_picture']
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

@playlist_routes.route("/<int:playlistId>", methods=["PUT"])
@login_required
def edit_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    if not playlist:
        return {"errors": ["Playlist couldn't be found"]}, 404

    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if playlist and form.validate_on_submit():
        if current_user.id == playlist.creator_id:
            playlist.title = request.get_json()["title"]
            playlist.description = request.get_json()["description"]
            playlist.playlist_picture = request.get_json()["playlist_picture"]
            db.session.commit()
            return playlist.to_dict(user=True)
    if form.errors:
        return form.errors


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

@playlist_routes.route("/<int:playlistId>", methods=["DELETE"])
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
