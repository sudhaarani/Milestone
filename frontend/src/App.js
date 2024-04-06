import './App.css';
import React from 'react';

import HomePage from './components/HomePage';
import TimelineEditModal from './components/TimelineEditModal';

import useApplicationData from "../src/hooks/useApplicationData";


function App() {
  const {
    state,setDisplayModal,handleModalTimeline
  } = useApplicationData();
  return (
    <div className="App">
      <HomePage state={state} setDisplayModal={setDisplayModal} handleModalTimeline={handleModalTimeline} />
      {state.displayModal && <TimelineEditModal setDisplayModal={setDisplayModal} state={state}
       />}
    </div>
  );
}

export default App;
