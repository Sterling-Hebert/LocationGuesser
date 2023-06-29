from flask import Blueprint, jsonify
from sqlalchemy import func

stats_routes = Blueprint('stats', __name__)

from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models.score import Score
from ..models.round import Round
from ..models.game import Game

stats_routes = Blueprint('stats', __name__)

@stats_routes.route('/famous_places')
@login_required
def user_games_famous_places():
    """
    Get current user's games for "famous_places" game mode
    """
    games = Game.query.filter_by(game_mode='famous_places', user_id=current_user.id).all()
    if not games:
        return {"message": "No games found, try playing the 'famous_places' game mode."}

    return {
        # may add game tracker
        # "Games": [game.to_dict() for game in games],
        "Famous Places mode stats": calculate_stats(games)
    }

@stats_routes.route('/world')
@login_required
def user_games_world():
    """
    Get current user's games for "world" game mode
    """
    games = Game.query.filter_by(game_mode='world', user_id=current_user.id).all()
    if not games:
        return {"message": "No games found, try playing the 'world' game mode."}

    return {
        # may add game tracker
        "Games": [game.to_dict() for game in games],
        "World mode stats": calculate_stats(games)
    }

@stats_routes.route('/united_states')
@login_required
def user_games_united_states():
    """
    Get current user's games for "united_states" game mode
    """
    games = Game.query.filter_by(game_mode='united_states', user_id=current_user.id).all()
    if not games:
        return {"message": "No games found, try playing the 'united_states' game mode."}

    return {
        # may add game tracker
        # "Games": [game.to_dict() for game in games],
        "United States mode stats": calculate_stats(games)
    }


@stats_routes.route('/my_stats')
@login_required
def user_stats():
    """
    Get user stats: total games played, average score, and highest score for all modes
    """
    total_games_played = Score.query.filter_by(user_id=current_user.id).count()
    average_score = Score.query.with_entities(func.avg(Score.final_score)).filter_by(user_id=current_user.id).scalar()
    highest_score = Score.query.filter_by(user_id=current_user.id).order_by(Score.final_score.desc()).first()

    stats = {
        'totalGamesPlayed': total_games_played,
        'avgScore': average_score,
        'highestScore': highest_score.final_score if highest_score else None
    }

    return jsonify(stats)

# helper function to pull calculated stat easier
def calculate_stats(games):
    total_games_played = Score.query.filter_by(user_id=current_user.id).count()
    average_score = Score.query.with_entities(func.avg(Score.final_score)).filter_by(user_id=current_user.id).scalar()
    # with_entities return the query, .scalar returns everything in the first col, first row
    # func required import
    highest_score = Score.query.filter_by(user_id=current_user.id).order_by(Score.final_score.desc()).first()

    stats = {
        'totalGamesPlayed': total_games_played,
        'avgScore': average_score,
        'highestScore': highest_score.final_score if highest_score else None
    }

    return stats
