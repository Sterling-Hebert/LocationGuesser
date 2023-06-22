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
    group_users = db.relationship('UsersGroup', back_populates='group')


    def to_dict(self):
        return {
            # 'id': self.id,
            'groupBanner': self.group_banner,
            'groupName': self.group_name,
            'groupOwnerId': self.owner_id,
            'groupMembers': {member.id: member.to_dict() for member in self.group_users},
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

    def to_resource_dict(self):
        return {
            # 'id': self.id,
            'groupBanner': self.group_banner,
            'groupName': self.group_name,
            'ownerId': self.owner_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
