from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Round(db.Model):
    __tablename__ = "rounds"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))
    round_number = db.Column(db.Integer)
    round_score = db.Column(db.Integer)
    has_started = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    game_rounds = db.relationship("Game", back_populates="rounds_game")



    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'round_number': self.round_number,
            'round_score': self.round_score,
            'previous_rounds':self.game_rounds,
            'has_started': self.has_started,
            'created_at': self.created_at,
        }
