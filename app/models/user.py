from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime



class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    profile_picture = db.Column(db.String(255))
    country_banner = db.Column(db.String(255))
    username = db.Column(db.String(255), unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user_games = db.relationship("Game", foreign_keys="Game.user_id", back_populates="user")
    scores_user = db.relationship("Score", back_populates="user")

    groups_joined = db.relationship('UsersGroup', back_populates='user')
    groups_owned = db.relationship('Group', back_populates='owner')

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
            'email': self.email,
            'profile_picture': self.profile_picture,
            'country_banner': self.country_banner,
            'username': self.username,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_games': self.user_games,
            'user_scores': self.scores_user,
            'groups_joined': self.groups_joined,
            'groups_owned': self.groups_owned,
        }
