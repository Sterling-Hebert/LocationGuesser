from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)

    user = db.relationship('User', foreign_keys=[user_id], back_populates='added_friends')
    friend = db.relationship('User', foreign_keys=[friend_id], back_populates='added_by')

class FriendRequest(db.Model):
    __tablename__ = "friend_requests"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    status = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    sender = db.relationship('User', foreign_keys='FriendRequest.sender_id', back_populates='sent_requests', )
    recipient = db.relationship('User', foreign_keys='FriendRequest.recipient_id', back_populates='received_requests',)

    def to_dict(self):
        return {
            'id': self.id,
            'senderId': self.sender_id,
            'receiverId': self.recipient_id,
            'status': self.status,
            'createdAt': self.created_at,
        }
