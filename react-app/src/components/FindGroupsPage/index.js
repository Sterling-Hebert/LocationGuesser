import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllGroups, joinGroupById } from '../../store/groups';


function FindGroupsPage() {
  const groups = useSelector(state => state.groups);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  const handleJoinGroup = async (groupId) => {
    try {
      await dispatch(joinGroupById(groupId));
      console.log('Group joined successfully');
      history.push('/social');
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <div>
      <h1>Find Groups</h1>
      {Object.values(groups.allGroups).map((group) => (
        <div key={group.id}>
          <img src={group.groupBanner} sizes='30' alt="Group Banner" />
          <h3>Group Name: {group.groupName}</h3>
          <p>Owner ID: {group.ownerId}</p>
          <p>Created At: {group.createdAt}</p>
          <p>Updated At: {group.updatedAt}</p>
          <button onClick={() => handleJoinGroup(group.id)}>Join</button>
          <p></p>
        </div>
      ))}
    </div>
  );
}

export default FindGroupsPage;
