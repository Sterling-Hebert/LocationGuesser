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
            # 'id': self.id,
            # 'userId': self.user_id,
            # 'gameId': self.game_id,
            'finalScore': self.final_score,
            'numberOfRounds': self.round_number,
            # 'user': self.user.to_resource_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
