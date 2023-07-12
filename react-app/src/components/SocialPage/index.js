import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllGroups, fetchUserGroups, deleteGroupById, unfollowGroupById } from '../../store/groups';
import './SocialPage.css';

function SocialPage() {
  const userfollowedGroups = useSelector(state => state.groups.userGroups.userGroups);
  const userOwnedGroups = useSelector(state => state.groups.userGroups.ownedGroups);

  const dispatch = useDispatch();

  const handleDeleteGroup = async (groupId) => {
    try {
      const { message } = await dispatch(deleteGroupById(groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleUnfollowGroup = async (groupId) => {
    try {
      const response = await dispatch(unfollowGroupById(groupId));
      console.log(response);
      if (response && response.message) {
        const { message } = response;
        console.log(message);
      }
    } catch (error) {
      console.error('Error unfollowing group:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllGroups());
    dispatch(fetchUserGroups());
  }, [dispatch]);

  return (
    <div className="social-page">
      <Link to="/main-menu" className="back-button">
        Back
      </Link>
      <h1>Welcome to the Social Page!</h1>
      <div className="group-section">
        <h2>Create or Join a Group</h2>
        <button>
          <Link to="/groups/create">Create a Group</Link>
        </button>
        <button>
          <Link to="/groups/explore">Join a Group</Link>
        </button>
      </div>
      <div className="group-section">
        <h2>Owned Group Details: </h2>
        {userOwnedGroups.length > 0 ? (
          userOwnedGroups.map((group) => (
            <div className='group-section' key={group.id}>
              <h3>Group Name: {group.groupName}</h3>
              {group.ownerId && <p>Group Owner: {group.ownerId}</p>}
              {group.groupBanner && <p>Group Banner: {group.groupBanner}</p>}
              <button>
                <Link to={`/groups/edit/${group.id}`}>Edit</Link>
              </button>
              <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No groups found</p>
        )}
      </div>
      <div className="group-section">
        <h2>Joined Group Details:</h2>
        {userfollowedGroups.length > 0 ? (
          userfollowedGroups.map((group) => {
            if (group.group) {
              return (
                <div className="group-section" key={group.id}>
                  <h3>Group Name: {group.group.groupName}</h3>
                  {group.group.ownerId && <p>Group Owner: {group.group.ownerId}</p>}
                  {group.group.groupBanner && <p>Group Banner: {group.group.groupBanner}</p>}
                  <button onClick={() => handleUnfollowGroup(group.group.id)}>Unfollow group</button>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No groups found</p>
        )}
      </div>
    </div>
  );
}

export default SocialPage;
