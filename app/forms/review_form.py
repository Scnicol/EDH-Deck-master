from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CreateReviewForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    
