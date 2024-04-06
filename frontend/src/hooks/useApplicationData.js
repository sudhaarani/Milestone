import { useReducer, useEffect } from 'react';

const useApplicationData = () => {

  //setting initial states
  const stateDeclare = {
    timelines: [],
    displayModal: false,
    selectedTimeline: null,
  }

  const ACTIONS = {
    SET_TIMELINE: 'SET_TIMELINE',
    DISPLAY_MODAL: 'DISPLAY_MODAL',
    SELECT_TIMELINE: 'SELECT_TIMELINE'
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_TIMELINE:
        return { ...state,timelines: action.result }
      case ACTIONS.DISPLAY_MODAL:
        console.log("action.result:",action.result)
        return { ...state, displayModal: action.result }
      case ACTIONS.SELECT_TIMELINE:
        return { ...state, selectedTimeline: action.result }
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
        console.log("useeffect data:",data);
        dispatch({ type: ACTIONS.SET_TIMELINE, result: data });
      })
      .catch(error => {
        console.error('Error fetching topics:', error);
      })
  }, []);

  //to make display and close the modal
  const setDisplayModal = () => {
    dispatch({ type: ACTIONS.DISPLAY_MODAL, result: !state.displayModal });
  }

  const handleModalTimeline = (id) => {
   // console.log("id:", id);
    const handleModalResult = state.timelines.find(timeline => timeline.id === id)
   // console.log("handleModalResult:", handleModalResult);
    dispatch({ type: ACTIONS.SELECT_TIMELINE, result: handleModalResult });
  }

  return {
    state,setDisplayModal, handleModalTimeline
  };
}

export default useApplicationData;
