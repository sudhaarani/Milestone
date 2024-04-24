import { useReducer, useEffect } from 'react';

const useApplicationData = () => {

  //setting initial states
  const stateDeclare = {
    timelines: [],
    selectedTimeline: null,
    favTimelines: [],
    milestonesByTimeline: [],
    searchedMilestones: [],
    selectedMilestone: null,
    followedUsers: [],
  }
  
  const ACTIONS = {
    SET_TIMELINE: 'SET_TIMELINE', // fetches all timelines data from the backend
    SELECT_TIMELINE: 'SELECT_TIMELINE',
      // selects data pretaining to a timeline (exmaple: when clicking edit button, state updates to timline data associated with that edit button) 
    SET_FAV_TIMELINES: 'SET_FAV_TIMELINES',
    GET_MILESTONES_BY_TIMELINE: 'GET_MILESTONES_BY_TIMELINE',
    SEARCHED_MILESTONES: 'SEARCHED_MILESTONES',
    SELECT_MILESTONE: 'SELECT_MILESTONE',
    ADD_NEW_TIMELINE: 'ADD_NEW_TIMELINE',
    SET_FOLLOWED_USERS: 'SET_FOLLOW_USER'
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_TIMELINE:
        return { ...state, timelines: action.result }

      case ACTIONS.SELECT_TIMELINE:
        return { ...state, selectedTimeline: action.result }
        
      case ACTIONS.SET_FAV_TIMELINES:
        return { ...state, favTimelines: action.result }
      
      case ACTIONS.GET_MILESTONES_BY_TIMELINE:
        return { ...state, milestonesByTimeline: action.result }
    
      case ACTIONS.SEARCHED_MILESTONES:
        return { ...state, searchedMilestones: action.result }

      case ACTIONS.SELECT_MILESTONE:
        return { ...state, selectedMilestone: action.result }

      case ACTIONS.SET_FOLLOWED_USERS:
        return { ...state, followedUsers: action.result }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, stateDeclare);


  // Rendering followedUsers state
  const renderFollowedUsers = (loggedInId) => {
    fetch(`/api/followings/${loggedInId}`)
      .then(res => res.json())
      .then(data => {
        const arrayOfFollowedUserIds = data.map(item => item.user2_id);
        dispatch({ type: ACTIONS.SET_FOLLOWED_USERS, result: arrayOfFollowedUserIds });
      })
      .catch(error => {
        console.error('Error fetching followed users:', error);
      })
  }

  const handleFollowedUsers = (userId, loggedInId) => {
    const updatedFollowedUsers = state.followedUsers.includes(userId) ? state.followedUsers.filter(user_id =>
      user_id !== userId) : [...state.followedUsers, userId]

      console.log("loggedInId aka user1_id: ", loggedInId)
      console.log("userId aka user2_id: ", userId)
    dispatch({ type: ACTIONS.SET_FOLLOWED_USERS, result: updatedFollowedUsers });
    
    // Determine whether to send a POST or DELETE request to backend, based on whether userId is already in followedUsers state or not:
    const method = state.followedUsers.includes(userId) ? 'DELETE' : 'POST';

    // Send a request that will either add or remove an entry from the followings table
    fetch(`/api/followings/${loggedInId}`, { 
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user1Id: loggedInId, user2Id: userId }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(method === 'DELETE' ? 'Failed to remove previously followed user' : 'Failed to add user to followings');
      }
    });
  }

  const handleFollowingPage = () => {
    const idsOfFollowedUsers = state.followedUsers
    fetch('/api/timelines')
      .then(res => res.json())
      .then(data => { 
        // goal: display timelines of followed users only. check if user_id of a timeline is in the followedUsers array
        const followedUsersFullTimelines = data.filter(timeline => {
          return idsOfFollowedUsers.includes(timeline.user_id);
        });
        dispatch({ type: ACTIONS.SET_TIMELINE, result: followedUsersFullTimelines });
      })
      .catch(error => {
        console.error('Error fetching timelines:', error);
      })
  }


  const handleHomePage = () => {
    fetch('/api/timelines')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: ACTIONS.SET_TIMELINE, result: data });
      })
      .catch(error => {
        console.error('Error fetching timelines:', error);
      })
  };

  useEffect(() => {
    handleHomePage();
  }, []);


  //to display milestones based on selected timeline
  const getMilestonesByTimeline = (timeline_id) => {
    fetch(`/api/timelines/milestones/${timeline_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json()
      })
      .then(data => {
        dispatch({ type: ACTIONS.GET_MILESTONES_BY_TIMELINE, result: data });
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      })
  }


  //to display searched milestones 
  const searchKeyword = (timeline_id,keyword) => {
    fetch(`/api/milestones/search/${timeline_id}/${keyword}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json()
      })
      .then(data => {
        console.log("searched data:", data);
        dispatch({ type: ACTIONS.SEARCHED_MILESTONES, result: data });
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      })
  }


  const handleSearchByDate = (timeline_id,fromDate,toDate) => {
    fetch(`/api/milestones/search/${timeline_id}/${fromDate}/${toDate}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json()
        })
        .then(data => {
          console.log("searched by date data:", data);
          dispatch({ type: ACTIONS.SEARCHED_MILESTONES, result: data });
        })
        .catch(error => {
          console.error('Error fetching topics:', error);
        })
    }

  const handleSelectedTimeline = (id) => {
    /* Old code for handleSelectedTimeline. needed to change it so that newly created timeline opens up without refreshing (state.timelines was interferring): */
    // const selectedTimelineResult = state.timelines.find(timeline => timeline.id === id)
    // console.log("selectedTimelineResult: ", selectedTimelineResult);
    // dispatch({ type: ACTIONS.SELECT_TIMELINE, result: selectedTimelineResult }); 
    
    fetch('/api/timelines')
      .then(res => res.json())
      .then(data => {
        const selectedTimeline = data.find(timeline => timeline.id === id);
        if (selectedTimeline) {
          dispatch({ type: ACTIONS.SELECT_TIMELINE, result: selectedTimeline });
        } else {
          console.error('Timeline with id ' + id + ' not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching timelines:', error);
      });
  }


  const renderFavourites = (loggedInId) => {
    fetch(`/api/timelines/favourites/${loggedInId}`)
      .then(res => res.json())
      .then(data => {
        const likedTimelineIds = data.map(item => item.timeline_id);
        dispatch({ type: ACTIONS.SET_FAV_TIMELINES, result: likedTimelineIds });
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      })
  }


  const handleFavourites = (timeline_id, user_id) => {
    const updatedFavTimelines = state.favTimelines.includes(timeline_id) ? state.favTimelines.filter(tl_id =>
      tl_id !== timeline_id
    ) : [...state.favTimelines, timeline_id]

    // Update favTimelines state locally (temporary -> need to still update database)
    dispatch({ type: ACTIONS.SET_FAV_TIMELINES, result: updatedFavTimelines });

    // Determine whether to send a POST or DELETE request to backend, based on whether timeline_id is already in favTimelines state or not:
    const method = state.favTimelines.includes(timeline_id) ? 'DELETE' : 'POST';

    // Send a request that will either add or remove a timeline from the favs table
    fetch(`/api/timelines/favourites/${user_id}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timelineId: timeline_id, userId: user_id }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(method === 'DELETE' ? 'Failed to remove previously favourited timeline' : 'Failed to add timeline to favourites');
      }
    });
  }
  
  const handleFavouritesPage = () => {
    const idsOfFavTimelines = state.favTimelines
    fetch('/api/timelines')
      .then(res => res.json())
      .then(data => { 
        const favTimelinesFullObj = data.filter(timeline => idsOfFavTimelines.includes(timeline.id));
        dispatch({ type: ACTIONS.SET_TIMELINE, result: favTimelinesFullObj });
      })
      .catch(error => {
        console.error('Error fetching timelines:', error);
      })
  }

  const getClickedMilestone = (milestone_id) => {
    console.log("state.milestonesByTimeline: ", state.milestonesByTimeline);
    const Result = state.milestonesByTimeline.find(milestone => milestone.milestone_id === milestone_id)
    console.log("getClickedMilestone:Result: ", Result);
    dispatch({ type: ACTIONS.SELECT_MILESTONE, result: Result });
  }


  const getTimelinesOf1User = (userId) => {
    fetch(`/api/timelines/${userId}`)  //not needed, instead we can use state.timelines.find?
      .then(res => res.json())
      .then(data => {
        console.log("getTimelinesOf1User::data::", data);
        dispatch({ type: ACTIONS.SET_TIMELINE, result: data });
      })
      .catch(error => {
        console.error('Error fetching timelines of single user:', error);
      })
  }

  const handleDeleteTimeline = (timeline_id) => {
    console.log("timeline_id:", timeline_id);
    fetch(`/api/timelines/delete/${timeline_id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Timeline deleted successfully');
      const result=state.timelines.filter(timeline => timeline.id !==timeline_id)
      dispatch({ type: ACTIONS.SET_TIMELINE, result: result });
    })
    .catch(error => {
      console.error('Error deleting timeline:', error);
    });
  } 

  const handleDeleteMilestone = (timeline_id,milestone_id) => {
    ///milestones/delete/:timeline_id/:id
    fetch(`/api/milestones/delete/${timeline_id}/${milestone_id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Milestone deleted successfully');
      const result=state.milestonesByTimeline.filter(milestone => milestone.milestone_id !==milestone_id)
      dispatch({ type: ACTIONS.GET_MILESTONES_BY_TIMELINE, result: result });
    })
    .catch(error => {
      console.error('Error deleting milestone:', error);
    });
  } 
  
  return {
    state, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline, searchKeyword,
    getClickedMilestone, handleDeleteTimeline, handleDeleteMilestone, getTimelinesOf1User, handleFavouritesPage,
    handleSearchByDate,handleHomePage, handleFollowedUsers, handleFollowingPage, renderFollowedUsers, renderFavourites
  };
}

export default useApplicationData;
