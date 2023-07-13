from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.group import Group
from ..models.round import Round
from ..models.game import Game
from ..models.score import Score
from ..models.user_group import UsersGroup
from ..models import db
from datetime import datetime

game_routes = Blueprint('play', __name__)

@game_routes.route('/game/complete', methods=['POST'])
@login_required
def save_completed_game():
    """
    Save a completed game instance
    """
    data = request.get_json()
    game_id = data.get('game_id')
    final_score = data.get('finalScore')
    game_mode = data.get('game_mode')

    score = Score(
        user_id=current_user.id,
        game_id=game_id,
        final_score=final_score,
        round_number=None,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(score)
    db.session.commit()

    return jsonify({
        "message": "Game saved successfully",
        "game_id": game_id,
        "game_mode": game_mode,
        "final_score": final_score
    }), 201
