import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewGroup } from '../../store/groups';
import { useHistory } from 'react-router-dom';


const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');
  const [groupBanner, setGroupBanner] = useState('');
  const history = useHistory();


  const handleSubmit =  (e) => {
    e.preventDefault();
    const groupData = { groupName, groupBanner };

    try {
       dispatch(createNewGroup(groupData));
      history.push('/social');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Create New Group</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        </label>
        <br />
        <label>
          Group Banner:
          <input type="text" value={groupBanner} onChange={(e) => setGroupBanner(e.target.value)} />
        </label>
        <br />
        <button type="submit"  onClick={handleSubmit} >Create Group</button>
      </form>
    </div>
  );
};

export default CreateGroupPage;
