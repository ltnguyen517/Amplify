from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

user_followers = db.Table(
    "user_followers",
    db.Model.metadata,
    db.Column("user_followers", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("user_following", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

if environment == 'production':
    user_followers.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    playlist_amplifyusers = db.relationship("Playlist", back_populates="playlist_ofperson")

    playlist_following = db.relationship("Playlist", secondary="playlist_followers", back_populates="playlist_follower")

    followers = db.relationship("User", secondary=user_followers, primaryjoin=(user_followers.c.user_followers == id), secondaryjoin=(user_followers.c.user_following == id), backref=db.backref('user_followers', lazy='dynamic'), lazy='dynamic')

    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
