import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllGroups, fetchUserGroups, deleteGroupById, unfollowGroupById } from '../../store/groups';
import './SocialPage.css';
import logo from './locationIcon.png';

function SocialPage() {
  const userfollowedGroups = useSelector(state => state.groups.userGroups.userGroups);
  const userOwnedGroups = useSelector(state => state.groups.userGroups.ownedGroups);

  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [groupIdToDelete, setGroupIdToDelete] = useState(null);

  const handleDeleteGroup = async (groupId) => {
    setDeleteModalVisible(false);
    try {
      await dispatch(deleteGroupById(groupId));
      await dispatch(fetchUserGroups());
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };


  const handleUnfollowGroup = async (groupId) => {
    try {
      const { message } = await dispatch(unfollowGroupById(groupId)).then(dispatch(fetchUserGroups()));
      console.log(message);
    } catch (error) {
      console.error('Error unfollowing group:', error);
    }
  };
  const openDeleteModal = (groupId) => {
    setDeleteModalVisible(true);
    setGroupIdToDelete(groupId);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setGroupIdToDelete(null);
  };

  useEffect(() => {
    dispatch(fetchAllGroups());
    dispatch(fetchUserGroups());
  }, [dispatch, userfollowedGroups.length, userOwnedGroups.length]);


  return (
    <>
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <div className="social-page-container">
        <div className="social-page">
          <Link to="/main-menu" className="back-button">
            Back
          </Link>
          <h1>Welcome to the Social Page!</h1>
          <div className="create-group-section">
            <h2>Create or Join a Group</h2>
            <button>
              <Link to="/groups/create">Create a Group</Link>
            </button>
            <button>
              <Link to="/groups/explore">Join a Group</Link>
            </button>
          </div>
          <div className="group-section">
            <h2>Groups Owned Section </h2>
            <div className="group-section-container">
              {userOwnedGroups.length > 0 ? (
                userOwnedGroups.map((group) => (
                  <div className="group-section" key={group.id}>
                    <h3>{group.groupName}</h3>
                    {group.groupBanner && (
                      <p>
                        <img src={group.groupBanner} alt="Group Banner" />
                      </p>
                    )}
                    <button>
                      <Link to={`/groups/edit/${group.id}`}>Edit</Link>
                    </button>
                    <button onClick={() => openDeleteModal(group.id)}>Delete</button>
                  </div>
                ))
              ) : (
                <p>No groups found! Maybe create one?</p>
              )}
            </div>
          </div>
          <div className="group-section">
            <h2>Groups Followed Section</h2>
            <div className="group-section-container">
              {userfollowedGroups.length > 0 ? (
                userfollowedGroups.map((group) => {
                  if (group.group) {
                    return (
                      <div className="group-section" key={group.id}>
                        <h3>{group.group.groupName}</h3>
                        {group.group.groupBanner && (
                          <p>
                            <img src={group.group.groupBanner} alt="Group Banner" />
                          </p>
                        )}
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
          {deleteModalVisible && (
            <div className="modal">
              <div className="modal-content">
                <h3>Are you sure you want to delete the group?</h3>
                <button className="red" onClick={() => handleDeleteGroup(groupIdToDelete)}>
                  Yes
                </button>
                <button className="green" onClick={closeDeleteModal}>
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SocialPage;
