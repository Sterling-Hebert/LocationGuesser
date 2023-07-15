import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewGroup } from '../../store/groups';
import { useHistory } from 'react-router-dom';
import './CreateGroupPage.css';

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');
  const [groupBanner, setGroupBanner] = useState('');
  const [error, setError] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const history = useHistory();

  const validateUrl = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (groupName.length < 4) {
      setError('Group name must be at least 4 characters long.');
      return;
    }

    if (groupBanner.length < 8) {
      setError('Group banner must be at least 8 characters long.');
      return;
    }

    const isValidUrl = validateUrl(groupBanner);

    if (!isValidUrl) {
      setError('Invalid URL.');
      return;
    }

    const groupData = { groupName, groupBanner };

    try {
      const isGroupNameAvailable = await dispatch(createNewGroup(groupData));

      if (!isGroupNameAvailable) {
        setError('Group name is already taken.');
      } else {
        await dispatch(createNewGroup(groupData));
        history.push('/social');
      }
    } catch (error) {
      setError('Error creating group: ' + error.message);
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

  const isFormEmpty = !groupName || !groupBanner;

  return (
    <div className="card-container">
      <div className="card">
        <h2>Create New Group</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Group Name:
            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </label>
          <br />
          <label>
            Group Banner
            <br />
            (Link Address URL ending with JPG or URL ):
            <input className="input-box" type="text" value={groupBanner} onChange={handleGroupBannerChange} />
          </label>
          {bannerPreview && validateUrl(bannerPreview) && (
            <div className="banner-preview">
              <img src={bannerPreview} alt="Group Banner Preview" />
            </div>
          )}
          <br />
          <button type="submit" disabled={isFormEmpty}>
            Create Group
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;
