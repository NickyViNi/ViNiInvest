from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text



def seed_users():
    users = [
        {
            "first_name": "Nicky",
            "last_name": "Li",
            "username": "nickyli",
            "password": "password",
            "email": "nickyli@user.io",
            "profile_image_url": "https://viniinvest-bucket.s3.us-west-2.amazonaws.com/linnabellavatar.jpg"
        },
        {
            "first_name": "Vince",
            "last_name": "Deng",
            "username": "vincedeng",
            "password": "password",
            "email": "vincedeng@user.io",
            "profile_image_url": "https://viniinvest-bucket.s3.us-west-2.amazonaws.com/dafei.jpg"
        },
        {
            "first_name": "Hao",
            "last_name": "Lam",
            "username": "haolam",
            "password": "password",
            "email": "haolam@user.io",
            "profile_image_url": "https://viniinvest-bucket.s3.us-west-2.amazonaws.com/tuoni.jpg"
        },
        {
            "first_name": "Nick",
            "last_name": "Leger",
            "username": "nickleger",
            "password": "password",
            "email": "nickleger@user.io",
            "profile_image_url": "https://viniinvest-bucket.s3.us-west-2.amazonaws.com/oulu.jpg"
        }
     ]

    [db.session.add(User(**user)) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
