from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.user_group import UsersGroup

def seed_user_groups():
    demoUSfanGroup = UsersGroup(
        user_id=4, group_id=1)
    demoBRfanGroup = UsersGroup(
        user_id=5, group_id=2)
    demoMXfanGroup = UsersGroup(
        user_id=6, group_id=3)

    db.session.add(demoUSfanGroup)
    db.session.add(demoBRfanGroup)
    db.session.add(demoMXfanGroup)
    db.session.commit()


def undo_user_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users_groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users_groups"))

    db.session.commit()
