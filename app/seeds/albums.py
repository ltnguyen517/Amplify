from app.models import db, Album, environment, SCHEMA

def seed_albums():
    nightcaps = Album(
        title="Nightcaps",
        album_photo="https://amplifyproj.s3.amazonaws.com/AlbumPhotos/Nightcaps.jpeg",
        year=2023,
        artist_id=1
    )
    ceilings = Album(
        title="No Ceilings",
        album_photo="https://amplifyproj.s3.amazonaws.com/AlbumPhotos/NoCeilings.jpeg",
        year=2020,
        artist_id=2
    )
    sound = Album(
        title="The Sound",
        album_photo="https://amplifyproj.s3.amazonaws.com/AlbumPhotos/TheSound.png",
        year=2023,
        artist_id=3
    )
    lately = Album(
        title="Lately",
        album_photo="https://amplifyproj.s3.amazonaws.com/AlbumPhotos/Lately.jpeg",
        year=2022,
        artist_id=4
    )
    savagery = Album(
        title="The Savagery",
        album_photo="https://amplifyproj.s3.amazonaws.com/AlbumPhotos/Savagery.jpeg",
        year=2015,
        artist_id=5
    )
    eyes = Album(
        title="All Eyes On U",
        album_photo="https://amplifyproj.s3.amazonaws.com/AlbumPhotos/Eyes.jpeg",
        year=2020,
        artist_id=6
    )

    all_albums = [nightcaps, ceilings, sound, lately, savagery, eyes]
    add_albums = [db.session.add(album) for album in all_albums]
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
