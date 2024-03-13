from app.models import db, Analysis, environment, SCHEMA
from sqlalchemy.sql import text



def seed_analysis_stocks():
    analyses = [
        {
            "user_id": 1,
            "stock_id": 1,
            "content": "111 Apple is good. Apple is bad, but Apple is ok. However Apple is so so. Maybe it's excellent but I dont' know. But perhaps it's amazing.",
            "recommendation": "Sell"
        },
        {
            "user_id": 2,
            "stock_id": 1,
            "content": "222 Apple is good. Apple is bad, but Apple is ok. However Apple is so so. Maybe it's excellent but I dont' know. But perhaps it's amazing.",
            "recommendation": "Buy"
        },
        {
            "user_id": 3,
            "stock_id": 1,
            "content": "333 Apple is good. Apple is bad, but Apple is ok. However Apple is so so. Maybe it's excellent but I dont' know. But perhaps it's amazing.",
            "recommendation": "Buy"
        },
        {
            "user_id": 4,
            "stock_id": 1,
            "content": "444 Apple is good. Apple is bad, but Apple is ok. However Apple is so so. Maybe it's excellent but I dont' know. But perhaps it's amazing.",
            "recommendation": "Hold"
        }
     ]

    [db.session.add(Analysis(**analysis)) for analysis in analyses]
    db.session.commit()


def undo_analysis_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.analyses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM analyses"))

    db.session.commit()
