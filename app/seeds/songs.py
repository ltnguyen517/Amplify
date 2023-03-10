from app.models import db, Song, Playlist, environment, SCHEMA

def seed_songs():
    last = Song(
        name="Last Call",
        album_id=1,
        song_url="https://amplifyproj.s3.amazonaws.com/Album1/Glass+Trio+-+Last+Call.mp3",
        duration="2:49"
    )
    danced = Song(
        name="When we danced",
        album_id=1,
        song_url="https://amplifyproj.s3.amazonaws.com/Album1/Annie+Berenson+-+When+we+danced.mp3",
        duration="4:29"
    )
    home = Song(
        name="Home town",
        album_id=1,
        song_url="https://amplifyproj.s3.amazonaws.com/Album1/Cole+Peers+trio+-+Home+town.mp3",
        duration="2:58"
    )
    sunrise = Song(
        name="Beautiful Sunrise",
        album_id=1,
        song_url="https://amplifyproj.s3.amazonaws.com/Album1/Arta+Porting+-+Beautiful+Sunrise.mp3",
        duration="4:51"
    )
    vine = Song(
        name="Vine Street",
        album_id=1,
        song_url="https://amplifyproj.s3.amazonaws.com/Album1/Soft+Brush+Touches+-+Vine+Street.mp3",
        duration="2:26"
    )

    all_songs = [last, danced, home, sunrise, vine]
    add_songs = [db.session.add(song) for song in all_songs]
    db.session.commit()

    swag = Song(
        name="Surf Swag",
        album_id=2,
        song_url="https://amplifyproj.s3.amazonaws.com/Album2/Lil+Wayne+-+Surf+Swag.mp3",
        duration="4:09"
    )
    shoes = Song(
        name="Shoes",
        album_id=2,
        song_url="https://amplifyproj.s3.amazonaws.com/Album2/Lil+Wayne+-+Shoes.mp3",
        duration="4:39"
    )
    money = Song(
        name="Money Trees",
        album_id=2,
        song_url="https://amplifyproj.s3.amazonaws.com/Album2/Kendrick+Lamar%2C+Jay+Rock+-+Money+Trees.mp3",
        duration="6:26"
    )
    kobe = Song(
        name="Kobe Bryant",
        album_id=2,
        song_url="https://amplifyproj.s3.amazonaws.com/Album2/Lil+Wayne+-+Lil+Wayne+-+Kobe+Bryant+(Official+Audio).mp3",
        duration="2:23"
    )
    good = Song(
        name="I'm Good",
        album_id=2,
        song_url="https://amplifyproj.s3.amazonaws.com/Album2/Lil+Wayne%2C+Lucci+Lou+-+Im+Good.mp3",
        duration="2:26"
    )

    all_songs2 = [swag, shoes, money, kobe, good]
    add_songs2 = [db.session.add(song) for song in all_songs2]
    db.session.commit()

    lost = Song(
        name="Lost Me",
        album_id=3,
        song_url="https://amplifyproj.s3.amazonaws.com/Album3/Stray+Kids+-+Lost+Me.mp3",
        duration="3:09"
    )
    you = Song(
        name="I do! Do you?",
        album_id=3,
        song_url="https://amplifyproj.s3.amazonaws.com/Album3/Kep1er+-+I+do!+Do+you.mp3",
        duration="3:34"
    )
    friend = Song(
        name="Best Friend Ever",
        album_id=3,
        song_url="https://amplifyproj.s3.amazonaws.com/Album3/NCT+DREAM+-+Best+Friend+Ever.mp3",
        duration="3:21"
    )
    awake = Song(
        name="Awake",
        album_id=3,
        song_url="https://amplifyproj.s3.amazonaws.com/Album3/THE+BOYZ+-+Awake.mp3",
        duration="2:17"
    )
    mirage = Song(
        name="Mirage",
        album_id=3,
        song_url="https://amplifyproj.s3.amazonaws.com/Album3/TFN+-+Mirage.mp3",
        duration="3:12"
    )

    all_songs3 = [lost, you, friend, awake, mirage]
    add_songs3 = [db.session.add(song) for song in all_songs3]
    db.session.commit()

    simple = Song(
        name="Simple Things",
        album_id=4,
        song_url="https://amplifyproj.s3.amazonaws.com/Album4/Two+Scents%2C+Yestalgia+-+Simple+Things.mp3",
        duration="2:40"
    )
    late = Song(
        name="Late Nights",
        album_id=4,
        song_url="https://amplifyproj.s3.amazonaws.com/Album4/ZENDR+-+Late+Nights.mp3",
        duration="1:54"
    )
    moon = Song(
        name="Silver Moon",
        album_id=4,
        song_url="https://amplifyproj.s3.amazonaws.com/Album4/Two+Scents%2C+Mondo+Loops+-+Silver+Moon.mp3",
        duration="2:03"
    )
    evergreen = Song(
        name="Evergreen",
        album_id=4,
        song_url="https://amplifyproj.s3.amazonaws.com/Album4/Two+Scents%2C+teafourtwo+-+Evergreen.mp3",
        duration="2:33"
    )
    reflection = Song(
        name="Reflection",
        album_id=4,
        song_url="https://amplifyproj.s3.amazonaws.com/Album4/HoK%C3%B8%2C+Yoann+Garel%2C+Damien+Fleau+-+Reflection.mp3",
        duration="2:25"
    )

    all_songs4 = [simple, late, moon, evergreen, reflection]
    add_songs4 = [db.session.add(song) for song in all_songs4]
    db.session.commit()

    us = Song(
        name="Us",
        album_id=5,
        song_url="https://amplifyproj.s3.amazonaws.com/Album5/Lil+Reese+-+Us.mp3",
        duration="3:21"
    )
    traffic = Song(
        name="Traffic",
        album_id=5,
        song_url="https://amplifyproj.s3.amazonaws.com/Album5/Lil+Reese%2C+Chief+Keef+-+Traffic.mp3",
        duration="3:57"
    )
    role = Song(
        name="No Role Modelz",
        album_id=5,
        song_url="https://amplifyproj.s3.amazonaws.com/Album5/J.+Cole+-+No+Role+Modelz.mp3",
        duration="4:52"
    )
    bank = Song(
        name="Bank Account",
        album_id=5,
        song_url="https://amplifyproj.s3.amazonaws.com/Album5/21+Savage+-+Bank+Account.mp3",
        duration="3:40"
    )
    lot = Song(
        name="a lot",
        album_id=5,
        song_url="https://amplifyproj.s3.amazonaws.com/Album5/21+Savage+-+a+lot.mp3",
        duration="4:48"
    )

    all_songs5 = [us, traffic, role, bank, lot]
    add_songs5 = [db.session.add(song) for song in all_songs5]
    db.session.commit()

    energy = Song(
        name="Energy",
        album_id=6,
        song_url="https://amplifyproj.s3.amazonaws.com/Album6/Kabaka+Pyramid%2C+Jemere+Morgan+-+Energy.mp3",
        duration="3:32"
    )
    down = Song(
        name="Let Me Down",
        album_id=6,
        song_url="https://amplifyproj.s3.amazonaws.com/Album6/Jaz+Karis+-+Let+Me+Down.mp3",
        duration="2:28"
    )
    lowe = Song(
        name="Lowe Mi",
        album_id=6,
        song_url="https://amplifyproj.s3.amazonaws.com/Album6/Sevana+-+Lowe+Mi.mp3",
        duration="3:54"
    )
    wicked = Song(
        name="The Wicked",
        album_id=6,
        song_url="https://amplifyproj.s3.amazonaws.com/Album6/I+Wayne+-+The+Wicked.mp3",
        duration="4:08"
    )
    magic = Song(
        name="Magic",
        album_id=6,
        song_url="https://amplifyproj.s3.amazonaws.com/Album6/Kes%2C+KES+the+Band%2C+Jimmy+October%2C+Etienne+Charles+-+Magic.mp3",
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
        playlist_song_inventory= [swag, shoes, money, kobe, good]
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
