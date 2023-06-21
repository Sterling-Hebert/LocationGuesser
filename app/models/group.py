from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Group(db.Model):
    __tablename__ = "groups"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    group_banner = db.Column(db.String(255))
    group_name = db.Column(db.String(255), unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    owner = db.relationship('User', back_populates="groups_owned")
    users = db.relationship('UsersGroup', back_populates='group_users')


def to_dict(self):
        return {
            'id': self.id,
            'group_banner': self.group_banner,
            'group_name': self.group_name,
            'group_owner': self.owner_id,
            'group_users': self.users,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
