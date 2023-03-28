from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.s3_helpers import ALLOWED_EXTENSIONS
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    creator_id = IntegerField("Creator Id", validators=[DataRequired()])
    title = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    playlist_picture = StringField("Image")
    # playlist_picture = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
