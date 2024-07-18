"""empty message

Revision ID: 5566002e19cb
Revises: 2578ac540d1c
Create Date: 2024-07-13 03:39:05.742791

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5566002e19cb'
down_revision = '2578ac540d1c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('my_games', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cover_id', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('my_games', schema=None) as batch_op:
        batch_op.drop_column('cover_id')

    # ### end Alembic commands ###