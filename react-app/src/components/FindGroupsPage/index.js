import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { fetchAllGroups, fetchUserGroups, joinGroupById } from '../../store/groups';
import './FindGroupPage.css';
import logo from './locationIcon.png';

function FindGroupsPage() {
  const groups = useSelector((state) => state.groups);
  const userfollowedGroups = useSelector(state => state.groups.userGroups.userGroups);
  const userOwnedGroups = useSelector(state => state.groups.userGroups.ownedGroups);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAllGroups());
    dispatch(fetchUserGroups());
  }, [dispatch]);

  const handleJoinGroup = async (groupId) => {
    if (isAlreadyJoined(groupId) || isAlreadyOwned(groupId)) {
      console.log('Already joined or owned the group');
      return;
    }

    try {
      await dispatch(joinGroupById(groupId));
      console.log('Group joined successfully');
      history.push('/social');
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const isAlreadyJoined = (groupId) => {
    return userfollowedGroups.some((group) => group.group && group.group.id === groupId);
  };

  const isAlreadyOwned = (groupId) => {
    return userOwnedGroups.some((group) => group.id === groupId);
  };

  return (
    <>
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <div className="find-groups-container">
        <Link to="/social" className="back-button">
          Back
        </Link>
        <h1>Find Groups</h1>
        <div className="group-cards">
          {Object.values(groups.allGroups).map((group) => (
            <div key={group.id} className="group-card">
              {group.groupBanner ? (
                <img src={group.groupBanner} alt="Group Banner" />
              ) : (
                <p>No group banner found</p>
              )}
              <h3>Group Name: {group.groupName}</h3>
              <p>Created At: {group.createdAt}</p>
              <p>Updated At: {group.updatedAt}</p>
              {!isAlreadyJoined(group.id) && !isAlreadyOwned(group.id) && (
                <button onClick={() => handleJoinGroup(group.id)}>Join</button>
              )}
              <p></p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FindGroupsPage;
