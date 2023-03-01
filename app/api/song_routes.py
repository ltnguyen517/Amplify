from flask import Blueprint, session, request, jsonify
from app.models import Song, Album

song_routes = Blueprint("songs", __name__)

# Get all songs

@song_routes.route("/")
def getAllSongs():
    getAllSongs = Song.query.all()
    songsDictionary = [song.to_dict() for song in getAllSongs]
    return {"songs": songsDictionary}

@song_routes.route("/<int:songId>")
def getASong(songId):
    getSong = Song.query.get(songId)
    if getSong:
        return getSong.to_dict()
    else:
        return {"note": "No such song in our library!"}
