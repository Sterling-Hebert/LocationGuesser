import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetails, editGroupById } from '../../store/groups';
import './EditGroupPage.css';

function EditGroupPage() {
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups[groupId]);
  const [groupName, setGroupName] = useState('');
  const [groupBanner, setGroupBanner] = useState('');
  const [error, setError] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (groupName.length < 4) {
      setError('Group name must be at least 4 characters long.');
      return;
    }

    if (!groupBanner || groupBanner.length < 8) {
      setError('Group banner must be at least 8 characters long.');
      return;
    }

    if (!isValidURL(groupBanner)) {
      setError('Invalid URL.');
      return;
    }

    const groupData = { groupName, groupBanner };

    try {
      await dispatch(editGroupById(groupId, groupData));
      history.push('/social');
    } catch (error) {
      setError('Error editing group: ' + error.message);
    }
  };

  const handleCancel = () => {
    history.push('/social');
  };

  const handleGroupBannerChange = (e) => {
    const url = e.target.value;
    setGroupBanner(url);
    setBannerPreview(url);
    setError('');
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h1>Edit Group</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Group Name: </label>
            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </div>
          <div>
            <label>Group Banner: </label>
            <input type="text" value={groupBanner} onChange={handleGroupBannerChange} />
            {bannerPreview && isValidURL(bannerPreview) && (
              <div className="banner-preview">
                <img src={bannerPreview} alt="Group Banner Preview" />
              </div>
            )}
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditGroupPage;
