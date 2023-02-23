from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

playlist_followers = db.Table(
    "playlist_followers",
    db.Model.metadata,
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id"))),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

if environment == 'production':
    playlist_followers.schema = SCHEMA

playlist_songs = db.Table(
    "playlist_songs",
    db.Model.metadata,
    db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id"))),
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")))
)

if environment == 'production':
    playlist_songs.schema = SCHEMA

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    playlist_picture = db.Column(db.Text)

    playlist_follower = db.relationship("User", secondary=playlist_followers, back_populates="playlist_following")

    playlist_song_inventory = db.relationship("Song", secondary=playlist_songs, back_populates="playlist_song")

    playlist_ofperson = db.relationship("User", back_populates="playlist_amplifyusers")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creator_id,
            'title': self.title,
            'description': self.description,
            'picture': self.playlist_picture,
            'person': self.playlist_ofperson.to_dict(),
            'songs': [song.to_dict() for song in self.playlist_song_inventory],
            'playlistFollowers': [user.to_dict() for user in self.playlist_follower]
        }
