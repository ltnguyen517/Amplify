from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, User, Playlist
from app.models.user import user_followers

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get a user's playlist

@user_routes.route("/<int:id>/playlists")
def get_playlist_of_user(id):
    user = User.query.get(id)
    return user.to_dict(amplifyPlaylists=True)

# User wants to follow a playlist

@user_routes.route("/<int:id>/playlist-follow/<int:playlistId>", methods=["POST"])
@login_required
def playlist_follow(id, playlistId):
    user = User.query.get(id)
    playlist = Playlist.query.get(playlistId)
    if user:
        if playlist:
            user.playlist_following.append(playlist)
            db.session.commit()
            return user.to_dict(following=True)
        else:
            return {"note": "Unable to find the playlist you're searching for"}
    else:
        return {"note": "Unable to find user"}

# User wants to delete a followed playlist

@user_routes.route("/<int:id>/playlist-follow/<int:playlistId>", methods=["DELETE"])
@login_required
def playlist_follow_delete(id, playlistId):
    user = User.query.get(id)
    playlist = Playlist.query.get(playlistId)
    if user:
        if playlist:
            user.playlist_following.remove(playlist)
            db.session.commit()
            return user.to_dict(following=True)
        else:
            return {"note": "Unable to find the playlist you're searching for"}
    else:
        return {"note": "Unable to find user"}

# View the playlists that a user follows

@user_routes.route("/<int:id>/playlists-followed")
def playlists_user_follows(id):
    user = User.query.get(id)
    if user:
        return user.to_dict(following=True)
    else:
        return {"note": f"User {id} does not exist"}
