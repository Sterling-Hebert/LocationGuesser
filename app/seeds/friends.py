from app.models import db, User, environment, SCHEMA
from app.models.friend import Friend
from sqlalchemy.sql import text

def seed_friends():

    demoUs = User.query.filter(User.username == 'DemoUs').one()
    DemoBR = User.query.filter(User.username == 'DemoBR').one()
    DemoMX = User.query.filter(User.username == 'DemoMX').one()

    friend1 = Friend(user_id=demoUs.id, friend_id=DemoBR.id)
    friend2 = Friend(user_id=demoUs.id, friend_id=DemoMX.id)
    friend3 = Friend(user_id=DemoBR.id, friend_id=DemoMX.id)

    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)

    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
