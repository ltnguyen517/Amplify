from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Playlist, Song
from app.models.user import follows

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

# Get user's song(s) likes

@user_routes.route("/<int:id>/likesof_song")
def song_likes(id):
    user = User.query.get(id)
    if user:
        return user.to_dict(likes=True)
    else:
        return {"note": "User was not found"}

# User wants to like/unlike a song

@user_routes.route("/<int:id>/like-unlikesong/<int:id2>", methods=["POST", "DELETE"])
@login_required
def like_unlike_song(id, id2):
    user = User.query.get(id)
    song = Song.query.get(id2)

    if user:
        if song:
            if request.method == "POST":
                user.usersend_likes.append(song)
                db.session.commit()
                return user.to_dict(likes=True)
            else:
                user.usersend_likes.remove(song)
                db.session.commit()
                return user.to_dict(likes=True)
        else:
            return {"note": "Song could not be found"}
    else:
        return {"note": "User could not be found"}

# User wants to follow another user

@user_routes.route("/<int:userId>/follow/<int:userId2>", methods=["POST"])
@login_required
def follow(userId, userId2):
    current_user = User.query.get(userId)
    second_user = User.query.get(userId2)

    current_user.followers.append(second_user)
    db.session.commit()
    current_followers = User.query.filter(User.followers.any(userId=userId2)).all()
    return {"followers": [follower.to_dict() for follower in current_followers]}

# User wants to unfollow another user

@user_routes.route("/<int:userId>/follow/<int:userId2>", methods=["DELETE"])
@login_required
def unfollow(userId, userId2):
    current_user = User.query.get(userId)
    second_user = User.query.get(userId2)

    current_user.followers.remove(second_user)
    db.session.commit()
    current_followers = User.query.filter(User.followers.any(userId=userId2)).all()
    return {"followers": [follower.to_dict() for follower in current_followers]}

# Get users following list

@user_routes.route("/<int:id>/followingcompilation")
def followingList(id):
    followingdeets = db.session.query(follows).filter_by(user_following = id).all()
    followeddeets = db.session.query(follows).filter_by(user_followers = id).all()

    newState = {"people_user_follows": [],
                "followers_of_user": []
                }
    for person, person2 in followingdeets:
        if person == id:
            newState["people_user_follows"].append(person2)

    for person, person2 in followeddeets:
        if person2 == id:
            newState["followers_of_user"].append(person)

    return newState
