

// Constants
const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const GET_GROUP_DETAILS = 'groups/GET_GROUP_DETAILS';
const GET_USER_GROUPS = 'groups/GET_USER_GROUPS';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const JOIN_GROUP = 'groups/JOIN_GROUP';
const UNFOLLOW_GROUP = 'groups/UNFOLLOW_GROUP';
const EDIT_GROUP = 'groups/EDIT_GROUP';
const DELETE_GROUP = 'groups/DELETE_GROUP';

// Action creators
export const getAllGroups = (groups) => {
  return {
    type: GET_ALL_GROUPS,
    payload: groups,
  };
};

export const getGroupDetails = (group) => {
  return {
    type: GET_GROUP_DETAILS,
    payload: group,
  };
};

export const getUserGroups = (userGroups, ownedGroups) => {
  return {
    type: GET_USER_GROUPS,
    payload: { userGroups, ownedGroups },
  };
};

export const createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    payload: group,
  };
};

export const joinGroup = (groupId) => {
  return {
    type: JOIN_GROUP,
    payload: groupId,
  };
};

export const unfollowGroup = (groupId) => {
  return {
    type: UNFOLLOW_GROUP,
    payload: groupId,
  };
};

export const editGroup = (group) => {
  return {
    type: EDIT_GROUP,
    payload: group,
  };
};

export const deleteGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    payload: groupId,
  };
};

// Thunk actions
export const fetchAllGroups = () => async (dispatch) => {
  const response = await fetch('/api/groups/');

  if (response.ok) {
    const { Groups } = await response.json();
    dispatch(getAllGroups(Groups));
    return Groups;
  }
};

export const fetchGroupDetails = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);

  if (response.ok) {
    const group = await response.json();
    dispatch(getGroupDetails(group));
    return group;
  }
};

export const fetchUserGroups = () => async (dispatch) => {
  const response = await fetch('/api/groups/my_groups');

  if (response.ok) {
    const { UserGroups, OwnedGroups } = await response.json();
    dispatch(getUserGroups(UserGroups, OwnedGroups));
    return { UserGroups, OwnedGroups };
  }
};

export const createNewGroup = (groupData) => async (dispatch) => {
  const response = await fetch('/api/groups/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });

  if (response.ok) {
    const { group_id, message } = await response.json();
    dispatch(createGroup({ id: group_id, ...groupData }));
    return { id: group_id, message };
  }
};

export const joinGroupById = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/join/${groupId}`, {
    method: 'POST',
  });

  if (response.ok) {
    const { message } = await response.json();
    dispatch(joinGroup(groupId));
    return { groupId, message };
  }
};

export const unfollowGroupById = (groupId) => async (dispatch) => {
  console.log(groupId)
  const response = await fetch(`/api/groups/unfollow/${groupId}`, {
    method: 'DELETE'
  });


  if (response.ok) {
    const { message } = await response.json();
    dispatch(unfollowGroup(groupId));
    return { groupId, message };
  }
};

export const editGroupById = (groupId, groupData) => async (dispatch) => {
  const response = await fetch(`/api/groups/edit/${groupId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });

  if (response.ok) {
    const { group } = await response.json();
    dispatch(editGroup(group));
    return group;
  }
};

export const deleteGroupById = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/delete/${groupId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const { message } = await response.json();
    dispatch(deleteGroup(groupId));
    return { groupId, message };
  }
};

// Reducer
const initialState = {
  allGroups: [],
  groupDetails: {},
  userGroups: { userGroups: [], ownedGroups: [] },
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GROUPS:
      const newState = {...state};
      newState.allGroups = action.payload;
      return newState
    case GET_GROUP_DETAILS:
      return {
        ...state,
        groupDetails: action.payload,
      };

    case GET_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload,
      };

    case CREATE_GROUP:
      return {
        ...state,
        allGroups: [...state.allGroups, action.payload],
      };

    case JOIN_GROUP:
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          userGroups: [...state.userGroups.userGroups, action.payload],
        },
      };

    case UNFOLLOW_GROUP:
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          userGroups: state.userGroups.userGroups.filter(
            (groupId) => groupId !== action.payload
          ),
        },
      };

    case EDIT_GROUP:
      return {
        ...state,
        groupDetails: action.payload,
        allGroups: state.allGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        ),
      };

    case DELETE_GROUP:
      return {
        ...state,
        allGroups: state.allGroups.filter(
          (group) => group.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
