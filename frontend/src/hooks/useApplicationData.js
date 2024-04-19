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
  }

  const ACTIONS = {
    SET_TIMELINE: 'SET_TIMELINE', // fetches all timelines data from the backend
    SELECT_TIMELINE: 'SELECT_TIMELINE',
      // selects data pretaining to a timeline (eg. when clicking edit button, state updates to timline data associated with that edit button) 
    SET_FAV_TIMELINES: 'SET_FAV_TIMELINES',
    GET_MILESTONES_BY_TIMELINE: 'GET_MILESTONES_BY_TIMELINE',
    SEARCHED_MILESTONES: 'SEARCHED_MILESTONES',
    SELECT_MILESTONE: 'SELECT_MILESTONE',
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
        
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, stateDeclare);

  // useEffect(() => {
  //   fetch('/api/timelines')
  //     .then(res => res.json())
  //     .then(data => {
  //       dispatch({ type: ACTIONS.SET_TIMELINE, result: data });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching topics:', error);
  //     })
  // }, [ACTIONS.SET_TIMELINE]);

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

  //to display milestones based on selected timeline in the homepage
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
    const selectedTimelineResult = state.timelines.find(timeline => timeline.id === id)
    console.log("selectedTimelineResult: ", selectedTimelineResult);
    dispatch({ type: ACTIONS.SELECT_TIMELINE, result: selectedTimelineResult }); 
  }

  useEffect(() => {
    fetch('/api/timelines/favourites/1') // HARDCODE user id as 1 (john_doe) for now
      .then(res => res.json())
      .then(data => {
        const likedTimelineIds = data.map(item => item.timeline_id);
        dispatch({ type: ACTIONS.SET_FAV_TIMELINES, result: likedTimelineIds });
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      })
  }, [ACTIONS.SET_FAV_TIMELINES]);


  const handleFavourites = (id) => {
    const updatedFavTimelines = state.favTimelines.includes(id) ? state.favTimelines.filter(_id =>
      _id !== id
    ) : [...state.favTimelines, id]

    // Update favTimelines state locally (temporary -> need to still update database)
    dispatch({ type: ACTIONS.SET_FAV_TIMELINES, result: updatedFavTimelines });

    // Determine whether to send a POST or DELETE request to backend, based on whether timeline_id is already in favTimelines state or not:
    const method = state.favTimelines.includes(id) ? 'DELETE' : 'POST';

    // Send a request that will either add or remove a timeline from the favs table
    fetch(`/api/timelines/favourites/1`, { // HARDCODE user id as 1 for now
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timelineId: id }),
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
    fetch(`/api/timelines/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({ type: ACTIONS.SET_TIMELINE, result: data });
      })
      .catch(error => {
        console.error('Error fetching timelines of single user:', error);
      })
  }

  return {
    state, handleHomePage, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline, searchKeyword,
    getClickedMilestone, handleSearchByDate, handleFavouritesPage, getTimelinesOf1User
  };
}

export default useApplicationData;
