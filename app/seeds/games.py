from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.game import Game

def seed_games():
    demoUSgame = Game(
        user_id=1, game_mode="world")
    demoBRgame = Game(
        user_id=2, game_mode="united_states")
    demoMXgame = Game(
        user_id=1, game_mode="famous_places")

    db.session.add(demoUSgame)
    db.session.add(demoBRgame)
    db.session.add(demoMXgame)
    db.session.commit()


def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
