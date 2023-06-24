from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.group import Group
from ..models.user_group import UsersGroup
from ..models import db

groups_routes = Blueprint('groups', __name__)


@groups_routes.route('/')
@login_required
def groups():
    """
    Query for all groups
    """
    groups = Group.query.all()
    return {"Groups": [group.to_resource_dict() for group in groups]}

@groups_routes.route('/<int:group_id>')
@login_required
def group_details(group_id):
    """
    Query for group details by id
    """
    group = Group.query.get(group_id)
    if group:
        return group.to_dict()
    else:
        return jsonify({"error": "Group not found"}), 404

@groups_routes.route('/my_groups')
@login_required
def user_groups():
    """
    Query for the the current users groups
    """
    user = current_user
    user_groups = UsersGroup.query.filter_by(user_id=user.id).all()
    return {"UserGroups": [user_group.to_dict() for user_group in user_groups]}
# need to add owned groupd as well in here

@groups_routes.route('/create', methods=['POST'])
@login_required
def create_group():
    """
    Create a new group
    """
    data = request.get_json()
    group_name = data.get('groupName')
    group_banner = data.get('groupBanner')
    new_group = Group(group_name=group_name, group_banner=group_banner)
    new_group.owner = current_user

    db.session.add(new_group)
    db.session.commit()

    return jsonify({"message": "Group created successfully", "group_id": new_group.id}), 201


@groups_routes.route('/join/<int:group_id>', methods=['POST'])
@login_required
def join_group(group_id):
    """
    Join a group
    """
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404
    user_group = UsersGroup(user_id=current_user.id, group_id=group_id)

    db.session.add(user_group)
    db.session.commit()

    return jsonify({"message": "You have now joined the group!"}), 201

@groups_routes.route('/unfollow/<int:group_id>', methods=['POST'])
@login_required
def unfollow_group(group_id):
    """
    Unfollow a group
    """
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404
    user_group = UsersGroup.query.filter_by(user_id=current_user.id, group_id=group_id).first()
    if not user_group:
        return jsonify({"error": "You are not following this group"}), 400

    db.session.delete(user_group)
    db.session.commit()

    return jsonify({"message": "You have unfollowed the group"}), 200


@groups_routes.route('/edit/<int:group_id>', methods=['PUT'])
@login_required
def edit_group(group_id):
    """
    Edit a group
    """
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404
    if group.owner != current_user:
        return jsonify({"error": "Must be owner of this group to edit"}), 403
    updated_data = request.get_json()
    group.group_name = updated_data.get('group_name', group.group_name)
    group.group_banner = updated_data.get('group_banner', group.group_banner)

    db.session.commit()

    return jsonify({"message": "Group successfully updated", "group": group.to_dict()}), 200


@groups_routes.route('/delete/<int:group_id>', methods=['DELETE'])
@login_required
def delete_group(group_id):
    """
    Delete a group
    """
    group = Group.query.get(group_id)
    if not group:
        return jsonify({"error": "Group not found"}), 404
    if group.owner != current_user:
        return jsonify({"error": "Must be owner of this group to delete"}), 403

    db.session.delete(group)
    db.session.commit()

    return jsonify({"message": "Group successfully deleted"}), 200
