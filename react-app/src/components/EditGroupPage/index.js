import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetails, editGroupById } from '../../store/groups';

function EditGroupPage() {
  const { groupId } = useParams();
  const group = useSelector(state => state.groups[groupId]);
  const [groupName, setGroupName] = useState('');
  const [groupBanner, setGroupBanner] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchGroupDetails(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (group) {
      setGroupName(group.groupName);
      setGroupBanner(group.groupBanner);
    }
  }, [group]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editGroupById(groupId, { groupName, groupBanner }));
    history.push('/social');
  };

  return (
    <div>
      <h1>Edit Group</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Group Name</label>
          <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        </div>
        <div>
          <label>Group Banner</label>
          <input type="text" value={groupBanner} onChange={(e) => setGroupBanner(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditGroupPage;
