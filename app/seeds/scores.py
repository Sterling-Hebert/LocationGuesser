from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.score import Score

def seed_scores():
    demoUsFinalScore = Score(
        user_id=1, game_id=1, final_score=25, round_number=5)
    demoBrFinalScore = Score(
        user_id=2, game_id=2, final_score=20, round_number=5)
    demoMxFinalScore = Score(
        user_id=3, game_id=3, final_score=22, round_number=5)

    db.session.add(demoUsFinalScore)
    db.session.add(demoBrFinalScore)
    db.session.add(demoMxFinalScore)
    db.session.commit()


def undo_scores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.scores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM scores"))

    db.session.commit()
