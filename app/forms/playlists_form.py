from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    creator_id = IntegerField("Creator Id", validators=[DataRequired()])
    title = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    playlist_picture = TextField("Image")
