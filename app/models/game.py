from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Game(db.Model):
    __tablename__ = "games"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_mode = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# many side user to games
    user = db.relationship("User", foreign_keys=[user_id], back_populates="user_games")
    rounds = db.relationship("Round", back_populates="game")


    def to_dict(self):
        return {
            # 'id': self.id,
            # 'userid': self.user_id,
            # 'user': self.user.to_resource_dict(),
            'gameMode': self.game_mode,
            'gameRounds': {round.id: round.to_dict() for round in self.rounds},
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

    def to_resource_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'gameMode': self.game_mode,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
