import { useReducer, useEffect } from 'react';

const useApplicationData = () => {

  //setting initial states
  const stateDeclare = {
    timelines: [],
    selectedTimeline: null,
    favTimelines: [],
  }

  const ACTIONS = {
    SET_TIMELINE: 'SET_TIMELINE', // fetches timeline data from the backend
    SELECT_TIMELINE: 'SELECT_TIMELINE',
      // selects data pretaining to a timeline (eg. when clicking edit button, state updates to timline data associated with that edit button) 
    SET_FAV_TIMELINES: 'SET_FAV_TIMELINES',
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_TIMELINE:
        return { ...state, timelines: action.result }

      case ACTIONS.SELECT_TIMELINE:
        return { ...state, selectedTimeline: action.result }
        
      case ACTIONS.SET_FAV_TIMELINES:
        return { ...state, favTimelines: action.result }
      
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
    const favouritedTimelines = state.timelines.filter(timeline => idsOfFavTimelines.includes(timeline.id));
    dispatch({ type: ACTIONS.SET_TIMELINE, result: favouritedTimelines }); 
  }

  return {
    state, handleHomePage, handleSelectedTimeline, handleFavourites, handleFavouritesPage
  };
}

export default useApplicationData;
