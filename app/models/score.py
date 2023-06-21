from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Score(db.Model):
    __tablename__ = "scores"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.String(255))
    final_score = db.Column(db.String(255))
    round_number = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="scores_user")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'final_score': self.final_score,
            'numOfRounds': self.round_number,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
