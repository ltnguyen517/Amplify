from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    album_photo = db.Column(db.String)
    year = db.Column(db.Integer)
    # artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artists.id")))

    songs = db.relationship("Song", back_populates="albums")
    # artists = db.relationship("Artist", back_populates="albums")

    def to_dict(self, pictures=False, songs=False):
        album = {
            'id': self.id,
            'title': self.title,
            'year': self.year,
            'artistId': self.artist.to_dict()
        }
        if pictures:
            album['AlbumPhoto'] = self.album_photo
        if songs:
            album['Songs'] = [song.to_dict() for song in self.songs]
        return album
