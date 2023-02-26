from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    # album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")))
    song_url = db.Column(db.String)

    song_within_playlist = db.relationship("Playlist", secondary="playlist_songs", back_populates="playlist_song_inventory")

    # albums = db.relationship("Album", back_populates="songs")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'albumId': self.album_id,
            'songUrl': self.song_url,
            # 'album': self.albums.to_dict()
        }
