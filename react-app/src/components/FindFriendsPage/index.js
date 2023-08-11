import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './locationIcon.png';
import { sendFriendRequest } from '../../store/requests';
import { getAllUsers } from '../../store/users';

function FindingFriendsPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);
  const currentUser = useSelector((state) => state.session.user.id);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSendFriendRequest = (userId) => {
    const request = {
      sender_id: currentUser,
      userId: userId,
      status: 'sent',
    };
    dispatch(sendFriendRequest(request.sender_id, userId, request.status));
    setSentRequests([...sentRequests, userId]); // Update sentRequests after sending request
  };

  if (!users) {
    return <div className="MMP-loading">Loading users...</div>;
  }

  return (
    <>
      <div className="MMP-logo">
        <img src={logo} alt="Location Icon" />
      </div>
      <div className="find-groups-container">
        <Link to="/social" className="back-button">
          Back
        </Link>
        <h1>Find Friends</h1>
        <div className="group-cards">
          {users.map((user) => (
            <div key={user.id} className="group-card">
              <div className='find-username'>{user.username}</div>
              {user.id !== currentUser && sentRequests.indexOf(user.id) === -1 ? (
                <button onClick={() => handleSendFriendRequest(user.id)}>Send Friend Request</button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FindingFriendsPage;
