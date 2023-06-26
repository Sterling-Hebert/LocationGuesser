import React, { useEffect, useState } from 'react';

function FindGroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch the groups from the server
    fetch('/api/groups/')
      .then((response) => response.json())
      .then((data) => setGroups(data.Groups))
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  return (
    <div>
      <h1>Find Groups</h1>
      {groups.map((group) => (
        <div key={group.id}>
          <h3>{group.groupName}</h3>
          <img src={group.groupBanner} sizes='30' alt="Group Banner" />
          <p>Owner ID: {group.ownerId}</p>
          <p>Created At: {group.createdAt}</p>
          <p>Updated At: {group.updatedAt}</p>
        </div>
      ))}
    </div>
  );
}

export default FindGroupsPage;
