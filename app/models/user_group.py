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
    group = db.relationship("Group",  back_populates="group_users")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'groupId': self.group_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'group': self.group.to_resource_dict(),
            'user': self.user.to_resource_dict()
        }
