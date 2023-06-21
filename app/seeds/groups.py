from app.models import db, User, environment, SCHEMA
from app.models.group import Group
from sqlalchemy.sql import text

def seed_groups():
    demoUsGroup = Group(
        group_banner="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkYh3QR8DxPitiCfYpKBVSLlQa_dPqQqGy-w&usqp=CAU", group_name='GoUSA', owner_id=1,)
    demoBrGroup = Group(
        group_banner="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag_of_Brazil.svg.png", group_name='GoBrazil', owner_id=2,)
    demoMxGroup = Group(
        group_banner="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/2000px-Flag_of_Mexico.svg.png", group_name='GoMexico', owner_id=3,)

    db.session.add(demoUsGroup)
    db.session.add(demoBrGroup)
    db.session.add(demoMxGroup)
    db.session.commit()

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()
