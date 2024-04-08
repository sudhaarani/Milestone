import './App.css';
import React from 'react';

import HomePage from './components/HomePage';
import TimelineEditModal from './components/TimelineEditModal';

import useApplicationData from "../src/hooks/useApplicationData";
import useToggle from "../src/hooks/useToggle";


function App() {
  const { state, handleSelectedTimeline } = useApplicationData();
  const { toggleState, handleToggle } = useToggle();

  return (
    <div className="App">
      <HomePage state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline} />

      {toggleState && <TimelineEditModal handleToggle={handleToggle} state={state} />}

    </div>
  );
}

export default App;
