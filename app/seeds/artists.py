from app.models import db, Artist, environment, SCHEMA

def seed_artists():
    glassTrio = Artist(
        name="Glass Trio",
        artist_photo="https://i.scdn.co/image/ab6761610000e5eb5ea3115057b094c81572f7a7"
    )
    lilWayne = Artist(
        name="Lil Wayne",
        artist_photo="https://i.scdn.co/image/ab6761610000e5ebc63aded6f4bf4d06d1377106"
    )
    strayKids = Artist(
        name="Stray Kids",
        artist_photo="https://i.scdn.co/image/ab67616d0000b2739d349c2092fbd7446e0fc35f"
    )
    twoScents = Artist(
        name="Two Scents",
        artist_photo="https://i.scdn.co/image/ab67616d00001e02265e0ff683df9d4db76214fd"
    )
    lilReese = Artist(
        name="Lil Reese",
        artist_photo="https://i.scdn.co/image/6502e44ea2ccd2bd7db7d95bf4375235174f98a8"
    )
    jazKaris = Artist(
        name="Jaz Karis",
        artist_photo="https://lastfm.freetls.fastly.net/i/u/ar0/af624058f4b90a0b395e3411cc422c95.jpg"
    )

    all_artists = [glassTrio, lilWayne, strayKids, twoScents, lilReese, jazKaris]
    add_artists = [db.session.add(artist) for artist in all_artists]
    db.session.commit()

def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.artists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM artists")

    db.session.commit()
