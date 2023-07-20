"""empty message

Revision ID: 476ec96a82a1
Revises: 
Create Date: 2023-07-20 11:09:41.002796

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '476ec96a82a1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('challenges',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=False),
    sa.Column('challengeDate', sa.DateTime(), nullable=False),
    sa.Column('challengerId', sa.Integer(), nullable=False),
    sa.Column('challengedId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['challengedId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['challengerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('decks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creatorId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creatorId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('deckId', sa.Integer(), nullable=True),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('imageUrl', sa.String(length=600), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['deckId'], ['decks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('reviewerId', sa.Integer(), nullable=False),
    sa.Column('deckId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['deckId'], ['decks.id'], ),
    sa.ForeignKeyConstraint(['reviewerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('wishlists',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('deckId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['deckId'], ['decks.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('userId', 'deckId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishlists')
    op.drop_table('reviews')
    op.drop_table('cards')
    op.drop_table('decks')
    op.drop_table('challenges')
    op.drop_table('users')
    # ### end Alembic commands ###