from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.group import Group
from ..models.round import Round
from ..models.game import Game
from ..models.score import Score
from ..models.user_group import UsersGroup
from ..models import db

game_routes = Blueprint('play', __name__)


@game_routes.route('/world', methods=['POST'])
@login_required
def create_world_game():
    """
    Create a world game instance
    """
    data = request.get_json()
    game_mode = data.get('gameMode', 'world')
    new_game = Game(user_id=current_user.id, game_mode=game_mode)
    db.session.add(new_game)
    db.session.commit()

    rounds = []
    for i in range(1, 6):
        round_instance = Round(game_id=new_game.id, round_number=i, round_score=0, has_started=False)
        rounds.append(round_instance)
        db.session.add(round_instance)

    db.session.commit()

    return jsonify({
        "message": "Game Started!",
        "game_id": new_game.id,
        "game_mode": new_game.game_mode,
        "rounds": [round_instance.to_dict() for round_instance in rounds]
    }), 201


@game_routes.route('/famous-places', methods=['POST'])
@login_required
def create_famous_places_game():
    """
    Create a famous places game instance
    """
    data = request.get_json()
    game_mode = data.get('gameMode', 'famous-places')
    new_game = Game(user_id=current_user.id, game_mode=game_mode)
    db.session.add(new_game)
    db.session.commit()

    rounds = []
    for i in range(1, 6):
        round_instance = Round(game_id=new_game.id, round_number=i, round_score=0, has_started=False)
        rounds.append(round_instance)
        db.session.add(round_instance)

    db.session.commit()

    return jsonify({
        "message": "Game Started!",
        "game_id": new_game.id,
        "game_mode": new_game.game_mode,
        "rounds": [round_instance.to_dict() for round_instance in rounds]
    }), 201


@game_routes.route('/united-states', methods=['POST'])
@login_required
def create_united_states_game():
    """
    Create a united-states game instance
    """
    data = request.get_json()
    game_mode = data.get('gameMode', 'united-states')
    new_game = Game(user_id=current_user.id, game_mode=game_mode)
    db.session.add(new_game)
    db.session.commit()

    rounds = []
    for i in range(1, 6):
        round_instance = Round(game_id=new_game.id, round_number=i, round_score=0, has_started=False)
        rounds.append(round_instance)
        db.session.add(round_instance)

    db.session.commit()

    return jsonify({
        "message": "Game Started!",
        "game_id": new_game.id,
        "game_mode": new_game.game_mode,
        "rounds": [round_instance.to_dict() for round_instance in rounds]
    }), 201


@game_routes.route('/edit-round-score/<int:round_id>', methods=['PUT'])
@login_required
def edit_round_score(round_id):
    """
    Edit a round within a game
    """
    finished_round = Round.query.get(round_id)
    if not finished_round:
        return jsonify({"error": "Round not found"}), 404
    game = finished_round.game
    if not game.user == current_user:
        return jsonify({"error": "You are not authorized to edit this round"}), 403

    updated_data = request.get_json()
    if not updated_data:
        return jsonify({"error": "No data provided"}), 400

    finished_round.round_score = updated_data.get('roundScore', finished_round.round_score)
    finished_round.has_started = updated_data.get('hasStarted', finished_round.has_started)

    db.session.commit()

# if the round youe updating is the final round, a finalScore report will be created and sent to the backend
# else the round will be updated and set to true
    if finished_round.round_number == 5 and finished_round.has_started:
        rounds = Round.query.filter_by(game_id=game.id).all()
        round_scores = [round_instance.round_score for round_instance in rounds]
        final_score = sum(round_scores)

        score = Score(user_id=current_user.id, game_id=game.id, final_score=str(final_score), round_number=str(finished_round.round_number))
        db.session.add(score)
        db.session.commit()

        return jsonify({
            "message": "Game Finished!",
            "final_score": final_score,
            "finalScoreId": score.id
        }), 200

    return jsonify({
        "message": "Round score updated",
        "round": finished_round.to_dict()
    }), 200
