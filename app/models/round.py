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

    game = db.relationship("Game", back_populates="rounds")



    def to_dict(self):
        return {
            'id': self.id,
            # 'gameId': self.game_id,
            'roundNumber': self.round_number,
            'roundScore': self.round_score,
            # 'rounds': self.game.to_resource_dict(),
            'hasStarted': self.has_started,
            'createdAt': self.created_at,
        }
