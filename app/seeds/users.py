from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        {
            "first_name": "Nicky",
            "last_name": "Li",
            "username": "nickyli",
            "password": "password",
            "email": "nickyli@user.io",
            "profile_image_url": "https://static.wikia.nocookie.net/disney/images/8/82/LinaBell.jpg/revision/latest/thumbnail/width/360/height/360?cb=20210917045304"
        },
        {
            "first_name": "Vince",
            "last_name": "Deng",
            "username": "vincedeng",
            "password": "password",
            "email": "vincedeng@user.io",
            "profile_image_url": "https://pic.baike.soso.com/ugc/baikepic2/1284/20230223223505-485846233_jpeg_1302_868_220111.jpg/1284"
        },
        {
            "first_name": "Hao",
            "last_name": "Lam",
            "username": "haolam",
            "password": "password",
            "email": "haolam@user.io",
            "profile_image_url": "https://www.orangestreetmall.com/cdn/shop/products/58f6f9fa27639_1.jpg?v=1665820397"
        },
        {
            "first_name": "Nick",
            "last_name": "Leger",
            "username": "nickleger",
            "password": "password",
            "email": "nickleger@user.io",
            "profile_image_url": "https://media.karousell.com/media/photos/products/2024/1/9/olu__disneyland_duffy_and_frie_1704786918_89466923_progressive.jpg"
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
