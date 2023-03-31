from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

# import os
# environment = os.getenv("FLASK_ENV")
# SCHEMA = os.environ.get('SCHEMA')

class Artist(db.Model):
    __tablename__ = "artists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    artist_photo = db.Column(db.String)

    albums = db.relationship("Album", back_populates="artist")

    def to_dict(self, songs=False, albums=False):
        artist = {
            "id": self.id,
            "name": self.name,
            "artist_photo": self.artist_photo
        }

        if songs:
            artist["Albums"] = [album.to_dict(songs=True) for album in self.albums]

        if albums:
            artist["Albums"] = [album.to_dict() for album in self.albums]

        return artist
