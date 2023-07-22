from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CreateCardForm(FlaskForm):
    deckId = IntegerField('deckId', validators=[DataRequired()])
    count = IntegerField('count', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
