from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_picture='https://media.licdn.com/dms/image/C4E03AQGzEbfkqAPq5w/profile-displayphoto-shrink_800_800/0/1623910878376?e=2147483647&v=beta&t=4lDwhV1ACtwcbZB1APcHSpQpxlvpXvuvrSzzfJV1ayw')
    godfrey = User(
        username='GodfreyGao', email='gao@yahoo.com', password='password', profile_picture='https://amplifyproj.s3.amazonaws.com/UserProfilePics/godfrey.jpeg'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_picture='https://amplifyproj.s3.amazonaws.com/UserProfilePics/marnie.jpg')
    lebron = User(
        username='KingJames', email='lakers@gmail.com', password='password', profile_picture='https://amplifyproj.s3.amazonaws.com/UserProfilePics/lebron.jpeg'
    )
    anh = User(
        username='BoHyun', email='anhbo@yahoo.com', password='password', profile_picture='https://amplifyproj.s3.amazonaws.com/UserProfilePics/anh.jpeg'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_picture='https://amplifyproj.s3.amazonaws.com/UserProfilePics/bobbie.jpeg'
    )

    userList = [demo, godfrey, marnie, lebron, anh, bobbie]
    add_users = [db.session.add(user) for user in userList]

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM follows")

    db.session.commit()
