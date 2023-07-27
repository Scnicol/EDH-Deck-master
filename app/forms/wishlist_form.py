from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class UpdateWishlistForm(FlaskForm):
    deckId = IntegerField('deckId', validators=[DataRequired()])
