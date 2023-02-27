from app.models import db, Album, environment, SCHEMA

def seed_albums():
    nightcaps = Album(
        title="Nightcaps",
        album_photo="https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/3f/98/52/3f9852fc-e2f3-9151-6081-4f838fec0e9f/6021.jpg/1200x1200bf-60.jpg",
        year=2023,
        artist_id=1
    )
    ceilings = Album(
        title="No Ceilings",
        album_photo="https://i.scdn.co/image/ab67616d0000b2730ecc76569dda9830ac05be7e",
        year=2020,
        artist_id=2
    )
    sound = Album(
        title="The Sound",
        album_photo="https://upload.wikimedia.org/wikipedia/en/8/8f/Stray_Kids_-_The_Sound.png",
        year=2023,
        artist_id=3
    )
    lately = Album(
        title="Lately",
        album_photo="https://i.discogs.com/MmhVGfuue25Ljw9AXF55AdF6vtHyGmStuiFnzI981V0/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2MDU5/MjY0LTE2NzYwNjc0/NDctMTk2Ny5qcGVn.jpeg",
        year=2022,
        artist_id=4
    )
    savagery = Album(
        title="The Savagery",
        album_photo="https://is4-ssl.mzstatic.com/image/thumb/Music126/v4/5f/73/f2/5f73f2f8-9381-6919-dc3e-652947b75281/853499007384.jpg/1200x1200bf-60.jpg",
        year=2015,
        artist_id=5
    )
    eyes = Album(
        title="All Eyes On U",
        album_photo="https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/09/5b/71/095b712b-15f6-65fe-2b16-043eb3f958a1/5059435986224.png/1200x1200bf-60.jpg",
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
