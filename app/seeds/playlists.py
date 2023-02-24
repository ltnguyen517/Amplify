from app.models import db, Playlist, environment, SCHEMA

def seed_playlists():
    jazz = Playlist(
        creator_id=1,
        title='Chilled Jazz',
        description='Mellow jazz to stay focused or unwind.',
        playlist_picture='https://i.scdn.co/image/ab67706f00000002392a9feff0144c3929490108'
    )
    rap = Playlist(
        creator_id=2,
        title='RapCaviar',
        description='New music from Polo G, Don Toliver and A Boogie Wit da Hoodie.',
        playlist_picture='https://i.scdn.co/image/ab67706c0000da843edc54301248b254cd66e43f'
    )
    kpop = Playlist(
        creator_id=3,
        title='K-Pop Fresh',
        description='The freshest K-Pop of today!',
        playlist_picture='https://i.scdn.co/image/ab67706f0000000282065b75f9e16e007bc61e01'
    )
    lofijazz = Playlist(
        creator_id=4,
        title='Jazz Lofi',
        description='A selection of carefully crafted, jazz infused lofi hip-hop tracks to help you escape to your favourite cafe on a crisp autumn afternoon... 🎺',
        playlist_picture='https://i.scdn.co/image/ab67706c0000da841e06d4daf6106ce92bd86f3e'
    )
    hiphop = Playlist(
        creator_id=5,
        title='Hip-Hop Favourites',
        description='The tracks you just keep pulling up.',
        playlist_picture='https://i.scdn.co/image/ab67706f000000022ca685619429b532370a735d'
    )
    carribean = Playlist(
        creator_id=6,
        title='Island Reggae',
        description='Let the music lift your soul. Vibes from the different islands in the Caribbean.',
        playlist_picture='https://i.scdn.co/image/ab67706f00000002cc860855a01c86a92b2e1ac4'
    )

    all_playlists = [jazz, rap, kpop, lofijazz, hiphop, carribean]
    add_playlists = [db.session.add(playlist) for playlist in all_playlists]
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlists")

    db.session.commit()
