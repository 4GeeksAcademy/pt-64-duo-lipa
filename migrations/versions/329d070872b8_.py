"""empty message

Revision ID: 329d070872b8
Revises: 5566002e19cb
Create Date: 2024-07-13 03:43:29.809145

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '329d070872b8'
down_revision = '5566002e19cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('my_games', schema=None) as batch_op:
        batch_op.alter_column('cover_id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=32),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('my_games', schema=None) as batch_op:
        batch_op.alter_column('cover_id',
               existing_type=sa.String(length=32),
               type_=sa.INTEGER(),
               existing_nullable=True)

    # ### end Alembic commands ###