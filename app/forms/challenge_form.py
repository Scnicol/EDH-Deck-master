from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField
from wtforms.validators import DataRequired

class CreateChallengeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    challengeDate = DateField('challengeDate', validators=[DataRequired()])
    challengedId = IntegerField('challengedId', validators=[DataRequired()])
