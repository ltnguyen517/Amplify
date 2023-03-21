from flask import Blueprint, session, request, jsonify
from app.models import Artist, Album

artist_routes = Blueprint("artists", __name__)

@artist_routes.route("/")
def get_all_artists():
    everyArtist = Artist.query.all()
    artist_dict = [artist.to_dict(albums=True) for artist in everyArtist]
    return {"artists": artist_dict}

@artist_routes.route("/<int:id>/")
def get_artist(id):
    oneArtist = Artist.query.get(id)
    artist_dict = oneArtist.to_dict(albums=True)
    return artist_dict

@artist_routes.route("/<int:id>/songs")
def songs_of_anArtist(id):
    artist = Artist.query.get(id)
    artist_dict = artist.to_dict(songs=True)
    return artist_dict
