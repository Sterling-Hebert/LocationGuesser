from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db
from app.models.friend import Friend, FriendRequest
from app.models.user import User
from datetime import datetime
from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError

requests_routes = Blueprint('requests', __name__)

@requests_routes.route('/friends', methods=['GET'])
@login_required
def get_friends():
    """
    All current user's friends
    """

    friends = User.query.get(current_user.id).added_friends

    return jsonify({"friends": [friend.friend.to_resource_dict() for friend in friends]}), 200


@requests_routes.route('/', methods=['GET'])
@login_required
def get_friend_requests():
    """
    Get all friend requests of the current user
    """
    friend_requests = FriendRequest.query.filter_by(recipient_id=current_user.id).all()

    return jsonify({"friend_requests": [request.to_dict() for request in friend_requests]}), 200

@requests_routes.route('/<int:recipient_id>', methods=['POST'])
@login_required
def send_friend_request(recipient_id):
    """
    Send a friend request
    """

    friend_request = FriendRequest(
        sender_id = current_user.id,
        recipient_id = recipient_id,
        status = 'Sent',
        created_at=datetime.utcnow(),
    )

    db.session.add(friend_request)
    db.session.commit()

    return jsonify({'message': 'Friend request sent'}), 201

@requests_routes.route('/<int:request_id>/accept', methods=['POST'])
@login_required
def accept_friend_request(request_id):
    """
    Accept a friend request
    """
    friend_request = FriendRequest.query.get(request_id)

    if friend_request is None or friend_request.recipient_id != current_user.id:
        return jsonify({'error': 'no such friend request or already friends'}), 400

    existing_friendship = Friend.query.filter(
        and_(Friend.user_id == friend_request.sender_id, Friend.friend_id == friend_request.recipient_id)
    ).first()

    if existing_friendship:
        db.session.delete(friend_request)
        db.session.commit()
        return jsonify({'message': 'Friendship already exists'})

    new_friendship = Friend(
        user_id=friend_request.sender_id,
        friend_id=friend_request.recipient_id
    )
    db.session.add(new_friendship)

    friend_request.status = 'Accepted'

    try:
        db.session.commit()
        db.session.delete(friend_request)
        db.session.commit()
        return jsonify({'message': 'Friend request accepted'}), 200
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Error accepting friend request'}), 500

@requests_routes.route('/<int:request_id>/decline', methods=['POST'])
@login_required
def decline_friend_request(request_id):
    """
    Decline a friend request
    """
    friend_request = FriendRequest.query.get(request_id)

    if friend_request is None or friend_request.recipient_id != current_user.id:
        return jsonify({'error': 'no request or already declined'})

    friend_request.status = 'Declined'

    db.session.delete(friend_request)

    db.session.commit()

    return {'friend_requests': [friend_request.to_dict()]}


@requests_routes.route('/<int:friend_id>/remove', methods=['DELETE'])
@login_required
def remove_friend(friend_id):
    """
    Delete a friend
    """

    friend = Friend.query.filter((Friend.user_id == current_user.id) & (Friend.friend_id == friend_id)).first()

    if not friend:
        return jsonify({'error': 'No such friend exists'}), 404

    db.session.delete(friend)
    db.session.commit()

    return jsonify({'message': 'Friend removed'}), 200
