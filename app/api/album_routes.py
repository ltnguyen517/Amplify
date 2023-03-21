from flask import Blueprint, session, request, jsonify
from app.models import Album

album_routes = Blueprint("albums", __name__)

@album_routes.route("/")
def get_all_albums():
    everyAlbum = Album.query.all()
    album_dict = [album.to_dict(pictures=True) for album in everyAlbum]
    return {"albums": album_dict}

@album_routes.route("/<int:id>/")
def get_an_album(id):
    album = Album.query.get(id)
    return album.to_dict(pictures=True, songs=True)

@album_routes.route("/<int:id>/songs")
def songs_of_anAlbum(id):
    album = Album.query.get(id)
    return album.to_dict(pictures=True, songs=True)
