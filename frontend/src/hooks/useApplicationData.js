import { useReducer, useEffect } from 'react';

const useApplicationData = () => {

  //setting initial states
  const stateDeclare = {
    timelines: [],
    selectedTimeline: null,
    favTimelines: [],
    milestonesByTimeline: [],
    searchedMilestones: [],

  }

  const ACTIONS = {
    SET_TIMELINE: 'SET_TIMELINE', // fetches all timelines data from the backend
    SELECT_TIMELINE: 'SELECT_TIMELINE',
      // selects data pretaining to a timeline (eg. when clicking edit button, state updates to timline data associated with that edit button) 
    SET_FAV_TIMELINES: 'SET_FAV_TIMELINES',
    GET_MILESTONES_BY_TIMELINE: 'GET_MILESTONES_BY_TIMELINE',
    SEARCHED_MILESTONES: 'SEARCHED_MILESTONES',
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
  }, [ACTIONS.SET_TIMELINE]);

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

  const handleSelectedTimeline = (id) => {
    const selectedTimelineResult = state.timelines.find(timeline => timeline.id === id)
    console.log("selectedTimelineResult: ", selectedTimelineResult);
    dispatch({ type: ACTIONS.SELECT_TIMELINE, result: selectedTimelineResult }); 
  }

  const handleFavourites = (id) => {
    const favouriteResult = state.favTimelines.includes(id) ? state.favTimelines.filter(_id =>
      _id !== id
    ) : [...state.favTimelines, id]
    dispatch({ type: ACTIONS.SET_FAV_TIMELINES, result: favouriteResult });
  }

  
  return {
    state, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline, searchKeyword
  };
}

export default useApplicationData;
