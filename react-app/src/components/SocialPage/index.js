import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllGroups, fetchUserGroups, deleteGroupById, unfollowGroupById } from '../../store/groups';
import { getAllFriends, getAllRequests, declineFriendRequest, acceptFriendRequest,deleteFriend } from '../../store/requests';
import './SocialPage.css';
import logo from './locationIcon.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


function SocialPage() {
  const userfollowedGroups = useSelector(state => state.groups.userGroups.userGroups);
  const userOwnedGroups = useSelector(state => state.groups.userGroups.ownedGroups);
  const allRequests = useSelector(state => state.requests.friendRequests);
  const allFriends = useSelector(state => state.requests.friends);
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

  const handleAcceptFriendRequest = async (requestId) => {
    dispatch(acceptFriendRequest(requestId));
    await dispatch(getAllFriends());
    window.location.reload();
  };

  const handleDeclineFriendRequest = async (requestId) => {
    await dispatch(declineFriendRequest(requestId));
    await dispatch(getAllFriends());
  };

  const handleDeleteFriend = (friendId) => {
    dispatch(deleteFriend(friendId));
  };

  useEffect(() => {
    dispatch(getAllFriends());
    dispatch(fetchUserGroups());
    dispatch(getAllRequests());
  }, [dispatch, userfollowedGroups.length, userOwnedGroups.length]);

  return (
    <>
      <div className="social-page">
        <Link to="/main-menu" className="back-button">
          Back
        </Link>
        <h1>Social Page</h1>
        <div className="create-group-section">
          <h2 className="move-right">Create or Join a Group</h2>
          <button>
            <Link to="/groups/create">Create a Group</Link>
          </button>
          <button>
            <Link to="/groups/explore">Join a Group</Link>
          </button>
          <button>
            <Link to="/social/find-friends">Find Friends</Link>
          </button>
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
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <div className="social-page-container">
        <div className="group-section">
          <h2>Groups Owned Section</h2>
          <div className="group-section-container">
            {userOwnedGroups.length > 0 ? (
              userOwnedGroups.map((group) => (
                <div className="group-section" key={group.id}>
                  <h3>{group.groupName}</h3>
                   <button>
                    <Link to={`/groups/edit/${group.id}`}>Edit</Link>
                  </button>
                  <button onClick={() => openDeleteModal(group.id)}>Delete</button>
                  {group.groupBanner && (
                    <p>
                      <img src={group.groupBanner} alt="Group Banner" />
                    </p>
                  )}
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
                      <button onClick={() => handleUnfollowGroup(group.group.id)}>Unfollow group</button>
                      {group.group.groupBanner && (
                        <p>
                          <img src={group.group.groupBanner} alt="Group Banner" />
                        </p>
                      )}
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
        <div className="request-wrapper">
          <div className="request-container">
            <h2 className="request-h2">Friend Requests</h2>
            {allRequests.length > 0 ? (
              <ul className="request-ul">
                {allRequests.map((request, index) => (
                  <li key={index} className="request-li">
                    Someone wants to be your friend!
                    <button onClick={() => handleAcceptFriendRequest(request.id)} className="request-button">
                      Accept
                    </button>
                    <button onClick={() => handleDeclineFriendRequest(request.id)} className="request-button">
                      Decline
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="request-p">No friend requests</p>
            )}
          </div>
        </div>
        <div className="friends-list-container">
      <h2 className="friends-list-h2">Friends List</h2>
      {allFriends.length > 0 ? (
        <ul className="friends-list-ul">
          {allFriends.map((friend, index) => (
            <li key={index} className="friends-list-li">
              {friend.username}
              <span
                className="delete-friend-button"
                onClick={() => handleDeleteFriend(friend.id)}
              >
                {/* <FontAwesomeIcon icon={faTimesCircle} className="delete-icon" /> */}
                {/* <br></br> */}
                x
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="friends-list-p">No friends found.</p>
      )}
    </div>
      </div>
    </>
  );
}

export default SocialPage;
