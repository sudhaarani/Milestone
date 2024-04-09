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

  useEffect(() => {
    fetch('/api/timelines')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: ACTIONS.SET_TIMELINE, result: data });
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      })
  }, []);

  const handleSelectedTimeline = (id) => {
    const selectedTimelineResult = state.timelines.find(timeline => timeline.id === id)

    console.log("selectedTimelineResult: ", selectedTimelineResult);

    dispatch({ type: ACTIONS.SELECT_TIMELINE, result: selectedTimelineResult }); 
  }

  const handleFavorites = (id) => {
    const favoriteResult = state.favTimelines.includes(id) ? state.favTimelines.filter(_id =>
      _id !== id
    ) : [...state.favTimelines, id]
    dispatch({ type: ACTIONS.SET_FAV_TIMELINES, result: favoriteResult });
  }

  return {
    state, handleSelectedTimeline, handleFavorites
  };
}

export default useApplicationData;
