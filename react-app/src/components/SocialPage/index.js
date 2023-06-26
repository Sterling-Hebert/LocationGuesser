import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SocialPage() {
  const [hasGroup, setHasGroup] = useState(false);

  useEffect(() => {
    fetch('api/groups/my_groups')
      .then((response) => response.json())
      .then((data) => {
        const userGroups = data.UserGroups;
        setHasGroup(userGroups.length > 0);
      })
      .catch((error) => {
        console.error('Error fetching user groups:', error);
      });
  }, []);

  return (
    <div>
      {!hasGroup ? (
        <div>
          <h1>Create or Join a Group</h1>
          <button>
            <Link to="/groups/create">Create a Group</Link>
          </button>
          <button>
            <Link to="/my-group/explore">Join a Group</Link>
          </button>
        </div>
      ) : (
        <>
        <h1>Welcome to the Social Page!</h1>
        <div>
        <h2>Group Details</h2>
        <p>Group Name: {hasGroup.groupName}</p>
        <p>Group Owner: {hasGroup.groupOwnerId}</p>
        <p>Group Banner: {hasGroup.groupBanner}</p>
        <h3>Group Members:</h3>
        {/* <ul>
          {Object.values(hasGroup.groupMembers).map((member) => (
            <li key={member.id}>{member.username}</li>
          ))}
        </ul> */}
      </div>
      </>
      )}
    </div>
  );
}

export default SocialPage;
