from app.models import db, Song, Playlist, environment, SCHEMA

def seed_songs():
    last = Song(
        name="Last Call",
        album_id=1,
        song_url="https://open.spotify.com/track/2nUhKiUfVdLcGmcdYHdjBw?si=6035fad3fa3949ba",
        duration="2:49"
    )
    danced = Song(
        name="When we danced",
        album_id=1,
        song_url="https://open.spotify.com/track/2pcDGklI3mOVMZrvnUF2t5?si=6a1aada97b3e4cba",
        duration="4:29"
    )
    home = Song(
        name="Home town",
        album_id=1,
        song_url="https://open.spotify.com/track/26UQyr3L71oAnXQIJf18gr?si=81a22e3246ec4c90",
        duration="2:58"
    )
    sunrise = Song(
        name="Beautiful Sunrise",
        album_id=1,
        song_url="https://open.spotify.com/track/6vtzBYf1I2Ozsdp94A2t5i?si=2f66ce41b78b4553",
        duration="4:51"
    )
    vine = Song(
        name="Vine Street",
        album_id=1,
        song_url="https://open.spotify.com/track/4W4PZdDzTUa06u4iXCKRxI?si=ffe712f80b544029",
        duration="2:26"
    )

    all_songs = [last, danced, home, sunrise, vine]
    add_songs = [db.session.add(song) for song in all_songs]
    db.session.commit()

    swag = Song(
        name="Surf Swag",
        album_id=2,
        song_url="https://open.spotify.com/track/56ehF3tXMjwLJkAmuKzRE2?si=2b4fbb93fce54cb9",
        duration="4:09"
    )
    shoes = Song(
        name="Shoes",
        album_id=2,
        song_url="https://open.spotify.com/track/5yHevmbP3PEex0kxP2cBc5?si=b0112568c70340f7",
        duration="4:39"
    )
    broke = Song(
        name="Broke Up",
        album_id=2,
        song_url="https://open.spotify.com/track/2tuP9seR6rU15jGMsXUKGa?si=c6284faed624408c",
        duration="3:48"
    )
    kobe = Song(
        name="Kobe Bryant",
        album_id=2,
        song_url="https://open.spotify.com/track/7sYtgBHnF2D1mgA7vNXig1?si=1454f2c00b454d99",
        duration="2:23"
    )
    good = Song(
        name="I'm Good",
        album_id=2,
        song_url="https://open.spotify.com/track/76YNfvQTKTMhnFNmBOW1nt?si=d55a4ee921fa4525",
        duration="2:26"
    )

    all_songs2 = [swag, shoes, broke, kobe, good]
    add_songs2 = [db.session.add(song) for song in all_songs2]
    db.session.commit()

    lost = Song(
        name="Lost Me",
        album_id=3,
        song_url="https://open.spotify.com/track/4KTK0uE4uJlS2Y8Gtq81I9?si=08ad30c94ee54339",
        duration="3:09"
    )
    you = Song(
        name="I do! Do you?",
        album_id=3,
        song_url="https://open.spotify.com/track/7wFeVMTlgOu910OH9RctRI?si=1b92f4c5186a4aad",
        duration="3:34"
    )
    friend = Song(
        name="Best Friend Ever",
        album_id=3,
        song_url="https://open.spotify.com/track/1Z5Dmg7Dvu0X4oSdqLZ3Lu?si=1fa287e21a2f4b5d",
        duration="3:21"
    )
    awake = Song(
        name="Awake",
        album_id=3,
        song_url="https://open.spotify.com/track/4EJfHZ99jW6QIBgWOctQBP?si=19d545fb90ce4ceb",
        duration="2:17"
    )
    mirage = Song(
        name="Mirage",
        album_id=3,
        song_url="https://open.spotify.com/track/0pb1A3X512jNOVaHkEouMi?si=0a0ff423d3e74eb4",
        duration="3:12"
    )

    all_songs3 = [lost, you, friend, awake, mirage]
    add_songs3 = [db.session.add(song) for song in all_songs3]
    db.session.commit()

    simple = Song(
        name="Simple Things",
        album_id=4,
        song_url="https://open.spotify.com/track/1sIhzlCiHJ7xYWe4Zf4NO5?si=62e43a933a1f49a4",
        duration="2:40"
    )
    late = Song(
        name="Late Nights",
        album_id=4,
        song_url="https://open.spotify.com/track/6wuFNv26eUmtgqURavWAZd?si=f169b69b620e4325",
        duration="1:54"
    )
    moon = Song(
        name="Silver Moon",
        album_id=4,
        song_url="https://open.spotify.com/track/1pdFdlCaBlPCiKOlFirlP4?si=6037bd04b1044c29",
        duration="2:03"
    )
    evergreen = Song(
        name="Evergreen",
        album_id=4,
        song_url="https://open.spotify.com/track/65Vo7KrPt7nrTBTlQpxVJi?si=d76c0d72057c4f2f",
        duration="2:33"
    )
    reflection = Song(
        name="Reflection",
        album_id=4,
        song_url="https://open.spotify.com/track/2p6UuVWDsjZ73icEPvXn6x?si=c020a88ea9434fe9",
        duration="2:25"
    )

    all_songs4 = [simple, late, moon, evergreen, reflection]
    add_songs4 = [db.session.add(song) for song in all_songs4]
    db.session.commit()

    us = Song(
        name="Us",
        album_id=5,
        song_url="https://open.spotify.com/track/4mRq7hOLd6o8c24WFhPsdY?si=7b5cf34d217d40f4",
        duration="3:21"
    )
    traffic = Song(
        name="Traffic",
        album_id=5,
        song_url="https://open.spotify.com/track/3WpGt7fhdIDd5ej7xyzbe8?si=93b1a24f4daa496b",
        duration="3:57"
    )
    role = Song(
        name="No Role Modelz",
        album_id=5,
        song_url="https://open.spotify.com/track/68Dni7IE4VyPkTOH9mRWHr?si=5e9f2507417e4f97",
        duration="4:52"
    )
    bank = Song(
        name="Bank Account",
        album_id=5,
        song_url="https://open.spotify.com/track/5eqK0tbzUPo2SoeZsov04s?si=28ceb8662d914746",
        duration="3:40"
    )
    lot = Song(
        name="a lot",
        album_id=5,
        song_url="https://open.spotify.com/track/2t8yVaLvJ0RenpXUIAC52d?si=7bc42c5498be45ef",
        duration="4:48"
    )

    all_songs5 = [us, traffic, role, bank, lot]
    add_songs5 = [db.session.add(song) for song in all_songs5]
    db.session.commit()

    energy = Song(
        name="Energy",
        album_id=6,
        song_url="https://open.spotify.com/track/6C76s0vqIxMnVH7ZOsdtS2?si=fa810a6fac194552",
        duration="3:32"
    )
    down = Song(
        name="Let Me Down",
        album_id=6,
        song_url="https://open.spotify.com/track/7FomypRpFKzSIBOX338U4P?si=a2620209ec0a4fe2",
        duration="2:28"
    )
    lowe = Song(
        name="Lowe Mi",
        album_id=6,
        song_url="https://open.spotify.com/track/23sdZgBlHvaHJcfOLu2PgZ?si=342a846505fc4469",
        duration="3:54"
    )
    wicked = Song(
        name="The Wicked",
        album_id=6,
        song_url="https://open.spotify.com/track/306Z0s3TVHyD0cSPJusjht?si=bb7fd916ada44532",
        duration="4:08"
    )
    magic = Song(
        name="Magic",
        album_id=6,
        song_url="https://open.spotify.com/track/2md0a0rA0bpwS45hy6suj4?si=c79600ebeb3a461c",
        duration="4:10"
    )

    all_songs6 = [energy, down, lowe, wicked, magic]
    add_songs6 = [db.session.add(song) for song in all_songs6]
    db.session.commit()

    jazz = Playlist(
        creator_id=1,
        title='Chilled Jazz',
        description='Mellow jazz to stay focused or unwind.',
        playlist_picture='https://i.scdn.co/image/ab67706f00000002392a9feff0144c3929490108',
        playlist_song_inventory= [last, danced, home, sunrise, vine]
    )
    rap = Playlist(
        creator_id=2,
        title='RapCaviar',
        description='New music from Polo G, Don Toliver and A Boogie Wit da Hoodie.',
        playlist_picture='https://i.scdn.co/image/ab67706c0000da843edc54301248b254cd66e43f',
        playlist_song_inventory= [swag, shoes, broke, kobe, good]
    )
    kpop = Playlist(
        creator_id=3,
        title='K-Pop Fresh',
        description='The freshest K-Pop of today!',
        playlist_picture='https://i.scdn.co/image/ab67706f0000000282065b75f9e16e007bc61e01',
        playlist_song_inventory= [lost, you, friend, awake, mirage]
    )
    lofijazz = Playlist(
        creator_id=4,
        title='Jazz Lofi',
        description='A selection of carefully crafted, jazz infused lofi hip-hop tracks to help you escape to your favourite cafe on a crisp autumn afternoon... 🎺',
        playlist_picture='https://i.scdn.co/image/ab67706c0000da841e06d4daf6106ce92bd86f3e',
        playlist_song_inventory= [simple, late, moon, evergreen, reflection]
    )
    hiphop = Playlist(
        creator_id=5,
        title='Hip-Hop Favourites',
        description='The tracks you just keep pulling up.',
        playlist_picture='https://i.scdn.co/image/ab67706f000000022ca685619429b532370a735d',
        playlist_song_inventory= [us, traffic, role, bank, lot]
    )
    carribean = Playlist(
        creator_id=6,
        title='Island Reggae',
        description='Let the music lift your soul. Vibes from the different islands in the Caribbean.',
        playlist_picture='https://i.scdn.co/image/ab67706f00000002cc860855a01c86a92b2e1ac4',
        playlist_song_inventory= [energy, down, lowe, wicked, magic]
    )

    all_playlists2 = [jazz, rap, kpop, lofijazz, hiphop, carribean]
    add_playlists = [db.session.add(playlist) for playlist in all_playlists2]
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")
        db.session.execute("DELETE FROM playlists")
        db.session.execute("DELETE FROM playlist_songs")

    db.session.commit()
