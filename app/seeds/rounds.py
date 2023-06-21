from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.round import Round

def seed_rounds():
    demoUsR1 = Round(
        game_id=1, round_number=1, round_score=5,has_started=True)
    demoUsR2 = Round(
        game_id=1, round_number=2, round_score=5,has_started=True)
    demoUsR3 = Round(
        game_id=1, round_number=3, round_score=5,has_started=True)
    demoUsR4 = Round(
        game_id=1, round_number=4, round_score=5,has_started=True)
    demoUsR5 = Round(
        game_id=1, round_number=5, round_score=5,has_started=True)
    demoBrR1 = Round(
        game_id=2, round_number=1, round_score=5,has_started=True)
    demoBrR2 = Round(
        game_id=2, round_number=2, round_score=5,has_started=True)
    demoBrR3 = Round(
        game_id=2, round_number=3, round_score=5,has_started=True)
    demoBrR4 = Round(
        game_id=2, round_number=4, round_score=2,has_started=True)
    demoBrR5 = Round(
        game_id=2, round_number=5, round_score=3,has_started=True)
    demoMxR1 = Round(
        game_id=3, round_number=1, round_score=5,has_started=True)
    demoMxR2 = Round(
        game_id=3, round_number=2, round_score=5,has_started=True)
    demoMxR3 = Round(
        game_id=3, round_number=3, round_score=5,has_started=True)
    demoMxR4 = Round(
        game_id=3, round_number=4, round_score=4,has_started=True)
    demoMxR5 = Round(
        game_id=3, round_number=5, round_score=3,has_started=True)

    db.session.add(demoUsR1)
    db.session.add(demoUsR2)
    db.session.add(demoUsR3)
    db.session.add(demoUsR4)
    db.session.add(demoUsR5)
    db.session.add(demoBrR1)
    db.session.add(demoBrR2)
    db.session.add(demoBrR3)
    db.session.add(demoBrR4)
    db.session.add(demoBrR5)
    db.session.add(demoMxR1)
    db.session.add(demoMxR2)
    db.session.add(demoMxR3)
    db.session.add(demoMxR4)
    db.session.add(demoMxR5)
    db.session.commit()


def undo_rounds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rounds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rounds"))

    db.session.commit()
