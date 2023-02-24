from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_picture='https://media.licdn.com/dms/image/C4E03AQGzEbfkqAPq5w/profile-displayphoto-shrink_800_800/0/1623910878376?e=2147483647&v=beta&t=4lDwhV1ACtwcbZB1APcHSpQpxlvpXvuvrSzzfJV1ayw')
    godfrey = User(
        username='GodfreyGao', email='gao@yahoo.com', password='password', profile_picture='https://i.pinimg.com/originals/72/10/48/721048c55cc9301eb1b0f2b96aa727e4.jpg'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_picture='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg')
    lebron = User(
        username='KingJames', email='lakers@gmail.com', password='password', profile_picture='https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/m5dapn9dj85obl9fjo98/lebron-james-fake-trade-twitter?fimg-ssr-default'
    )
    anh = User(
        username='BoHyun', email='anhbo@yahoo.com', password='password', profile_picture='https://i0.wp.com/annyeongoppa.com/wp-content/uploads/2020/04/MV5BZWY1MTQxYmEtNjgxZS00YmU3LWE3MWYtN2E4MjNkMWUzMDRjXkEyXkFqcGdeQXVyNDY5MjMyNTg@._V1_.jpg?resize=780%2C520&ssl=1'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_picture='https://static.vecteezy.com/system/resources/previews/004/607/791/original/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg')

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM user_followers")

    db.session.commit()
