"""empty message

Revision ID: 9744c15fc69d
Revises: ffdc0a98111c
Create Date: 2023-06-19 20:20:17.565276

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9744c15fc69d'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    if not inspector.has_table("groups"):
       op.create_table('groups',
       sa.Column('id', sa.Integer(), nullable=False),
       sa.Column('group_banner', sa.String(length=255), nullable=True),
       sa.Column('group_name', sa.String(length=255), nullable=True),
       sa.Column('owner_id', sa.Integer(), nullable=True),
       sa.Column('created_at', sa.DateTime(), nullable=True),
       sa.Column('updated_at', sa.DateTime(), nullable=True),
       sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name='fk_groups_owner_id_users' ),
       sa.PrimaryKeyConstraint('id'),
       sa.UniqueConstraint('group_name', name='uq_groups_group_name')
       )
       if not inspector.has_table("games"):
              op.create_table('games',
              sa.Column('id', sa.Integer(), nullable=False),
              sa.Column('user_id', sa.Integer(), nullable=True),
              sa.Column('game_mode', sa.String(length=255), nullable=True),
              sa.Column('created_at', sa.DateTime(), nullable=True),
              sa.Column('updated_at', sa.DateTime(), nullable=True),
              sa.ForeignKeyConstraint(['user_id'], ['users.id'],name='fk_games_user_id_users' ),
              sa.PrimaryKeyConstraint('id')
              )

       if not inspector.has_table("scores"):
              op.create_table('scores',
              sa.Column('id', sa.Integer(), nullable=False),
              sa.Column('user_id', sa.Integer(), nullable=True),
              sa.Column('game_id', sa.String(length=255), nullable=True),
              sa.Column('final_score', sa.String(length=255), nullable=True),
              sa.Column('round_number', sa.String(length=255), nullable=True),
              sa.Column('created_at', sa.DateTime(), nullable=True),
              sa.Column('updated_at', sa.DateTime(), nullable=True),
              sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_scores_user_id_users' ),
              sa.PrimaryKeyConstraint('id')
              )

       if not inspector.has_table("users_groups"):
              op.create_table('users_groups',
              sa.Column('id', sa.Integer(), nullable=False),
              sa.Column('user_id', sa.Integer(), nullable=True),
              sa.Column('group_id', sa.Integer(), nullable=True),
              sa.Column('created_at', sa.DateTime(), nullable=True),
              sa.Column('updated_at', sa.DateTime(), nullable=True),
              sa.ForeignKeyConstraint(['group_id'], ['groups.id'], name='fk_users_groups_group_id_groups'),
              sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_users_groups_user_id_users' ),
              sa.PrimaryKeyConstraint('id')
              )

       if not inspector.has_table("rounds"):
              op.create_table('rounds',
              sa.Column('id', sa.Integer(), nullable=False),
              sa.Column('game_id', sa.Integer(), nullable=True),
              sa.Column('round_number', sa.Integer(), nullable=True),
              sa.Column('round_score', sa.Integer(), nullable=True),
              sa.Column('has_started', sa.Boolean(), nullable=True),
              sa.Column('created_at', sa.DateTime(), nullable=True),
              sa.ForeignKeyConstraint(['game_id'], ['games.id'], name="fk_rounds_game_id_game" ),
              sa.PrimaryKeyConstraint('id')
              )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_picture', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('country_banner', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('group_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('owned_group_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))
        batch_op.alter_column('email', existing_type=sa.VARCHAR(length=255), nullable=True)
        batch_op.alter_column('username', existing_type=sa.VARCHAR(length=40), type_=sa.String(length=255), nullable=True)
        batch_op.create_foreign_key('fk_users_owned_group_id_groups_id', 'groups', ['owned_group_id'], ['id'])
        batch_op.create_foreign_key('fk_users_group_id_groups_id', 'groups', ['group_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('username',
               existing_type=sa.String(length=255),
               type_=sa.VARCHAR(length=40),
               nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')
        batch_op.drop_column('owned_group_id')
        batch_op.drop_column('group_id')
        batch_op.drop_column('country_banner')
        batch_op.drop_column('profile_picture')

    op.drop_table('rounds')
    op.drop_table('users_groups')
    op.drop_table('scores')
    op.drop_table('games')
    op.drop_table('groups')
    # ### end Alembic commands ###
