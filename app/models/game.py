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
    rounds_game = db.relationship("Round", back_populates="game_rounds")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_mode': self.game_mode,
            'rounds_game': self.rounds_game,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
