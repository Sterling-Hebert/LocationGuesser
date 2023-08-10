// constants
const ALL_FRIENDS = "request/ALL_FRIENDS"
const GET_ALL_REQUESTS = "request/GET_ALL_REQUESTS";
const SEND_REQUEST = "request/SEND_REQUEST";
const ACCEPT_REQUEST = "request/ACCEPT_REQUEST";
const DECLINE_REQUEST = "request/DECLINE_REQUEST";
const REMOVE_FRIEND = "request/REMOVE_FRIEND"


// actions
const allFriends = (friends) => {
  return {
    type: ALL_FRIENDS,
    payload: friends
  }
}

const allFriendRequests = (friendRequests) => {
  return {
    type: GET_ALL_REQUESTS,
    payload: friendRequests,
  }
};

const sendRequest = (request) => {
  return {
    type: SEND_REQUEST,
    payload: request,
  }
};

const acceptRequest = (requestId) => {
  return {
    type: ACCEPT_REQUEST,
    payload: requestId,
  };
};

const declineRequest = (requestId) => {
  return {
    type: DECLINE_REQUEST,
    payload: requestId
  }
};

const removeFriend = (friendId) => {
  return {
    type: REMOVE_FRIEND,
    payload: friendId
  }
}

//dispatches

export const getAllFriends = () => async (dispatch) => {
  const response = await fetch(`/api/requests/friends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(allFriends(data.friends))
  } else {
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  }
}

export const getAllRequests = () => async (dispatch) => {
  const response = await fetch(`/api/requests/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(allFriendRequests(data.friend_requests))
  } else {
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  }
};

// export const sendFriendRequest = (userId) => async (dispatch) => {
//   const response = await fetch(`/api/requests/${userId}`, {
//     method: 'POST',
//   })

//   if (response.ok) {
//     const { message } = await response.json();
//     dispatch(sendRequest(userId));
//     return {userId, message};
//   }
// };
export const sendFriendRequest = (sender_id, recipient_id, status) => async (dispatch) => {
    const request_data = {sender_id, recipient_id, status}
    const response = await fetch(`/api/requests/${recipient_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request_data)
    })
    if (response.ok) {
      const data = await response.json();
      dispatch(sendRequest({ data }));
    } else {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    }
  };

export const acceptFriendRequest = (request_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/requests/${request_id}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(acceptRequest(data))
    } else {
      const data = await response.json()
      if (data.errors) {
        return data.errors
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const declineFriendRequest = (request_id) => async (dispatch) => {
  const response = await fetch(`/api/requests/${request_id}/decline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    dispatch(declineRequest(request_id))
  } else {
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  }
};

export const deleteFriend = (friend_id) => async (dispatch) => {
  const response = await fetch(`/api/requests/${friend_id}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    dispatch(removeFriend(friend_id))
  } else {
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  }
}

const initialState = { friendRequests: [], friends: [] };

export default function friendRequestReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_FRIENDS:
      return {
        ...state,
        friends: action.payload
      }
    case GET_ALL_REQUESTS:
      return {
        ...state,
        friendRequests: action.payload
      }
    case SEND_REQUEST:
      return {
          ...state,
          friendRequests: [...state.friendRequests, action.payload]
      }
    case ACCEPT_REQUEST:
      return {
        ...state,
        friendRequests: state.friendRequests.filter((request) => request.id !== action.payload),
        friends: [...state.friends, state.friendRequests.find((request) => request.id === action.payload)],
      };
    case DECLINE_REQUEST:
      return {
        ...state,
        friendRequests: state.friendRequests.filter((index) => index.id !== action.payload)
      }
    case REMOVE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((index) => index.id !== action.payload)
      }
      default:
			return state;
	}
}
