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

    sent_requests = db.relationship('FriendRequest', back_populates='sender', foreign_keys='FriendRequest.sender_id')
    received_requests = db.relationship('FriendRequest', back_populates='recipient', foreign_keys='FriendRequest.recipient_id')

    added_friends = db.relationship(
        'Friend',
        primaryjoin='User.id==Friend.user_id',
        back_populates='user'
    )
    added_by = db.relationship(
        'Friend',
        primaryjoin='User.id==Friend.friend_id',
        back_populates='friend'
    )

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
            'countryBanner': self.country_banner,
            'username': self.username,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'gamesPlayed': {game.id: game.to_dict() for game in self.user_games},
            'userFinalScores': {score.id: score.to_dict() for score in self.scores_user},
            'groupsJoined':{group.id: group.to_dict() for group in self.groups_joined},
            'groupsOwned':{group.id: group.to_dict() for group in self.groups_owned},
            'addedFriends': [friend.username for friend in self.added_friends],
            'addedBy': [friend.username for friend in self.added_by]
        }
    def to_resource_dict(self):
        return{
            'id': self.id,
            'email': self.email,
            'profilePicture': self.profile_picture,
            'countryBanner': self.country_banner,
            'username': self.username,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
