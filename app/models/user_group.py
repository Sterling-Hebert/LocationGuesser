from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class UsersGroup(db.Model):
    __tablename__ = "users_groups"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", back_populates="groups_joined", )
    group_users = db.relationship("Group",  back_populates="users")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'groups_users': self.group_users,
        }
