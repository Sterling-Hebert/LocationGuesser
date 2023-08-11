from flask.cli import AppGroup
from .users import seed_users, undo_users
from app.seeds.groups import seed_groups, undo_groups
from app.seeds.games import seed_games, undo_games
from app.seeds.scores import seed_scores, undo_scores
from app.seeds.rounds import seed_rounds, undo_rounds
from app.seeds.user_groups import seed_user_groups, undo_user_groups
from app.seeds.friends import seed_friends, undo_friends
from app.seeds.friend_request import seed_friend_request, undo_friend_request



from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_groups()
        undo_games()
        undo_scores()
        undo_rounds()
        undo_user_groups()
        undo_friends()
        undo_friend_request()

    seed_users()
    seed_groups()
    seed_games()
    seed_scores()
    seed_rounds()
    seed_user_groups()
    seed_friends()
    seed_friend_request()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_games()
    undo_scores()
    undo_rounds()
    undo_user_groups()
    undo_friends()
    undo_friend_request()

    # Add other undo functions here
    # print("")
