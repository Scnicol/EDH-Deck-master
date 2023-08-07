from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from email_validator import EmailNotValidError, validate_email
from app.models import User

def email_is_valid(form, field):
    # Checking if email is valid
    email = field.data
    try:
        emailinfo = validate_email(email, check_deliverability=False)

        emailinfo = emailinfo.normalized
    except EmailNotValidError as e:

        raise ValidationError('Please use valid email address.')


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_length(form, field):
    # Checking for password length greater than 6
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be 6 characters or longer')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_is_valid])
    password = StringField('password', validators=[DataRequired(), password_length])
