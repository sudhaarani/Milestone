import './App.css';
import React from 'react';
import HomePage from './components/HomePage';
import MainModal from './components/MainModal';
import TimelineViewModal from './components/TimelineViewModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';

import useApplicationData from "../src/hooks/useApplicationData";
import useToggle from "../src/hooks/useToggle";


function App() {
  const { state, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline } = useApplicationData();
  const { toggleState, handleToggle} = useToggle();

  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />

      <HomePage state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites} getMilestonesByTimeline={getMilestonesByTimeline} />

      {toggleState && <TimelineViewModal handleToggle={handleToggle} state={state} />}
      {/* {toggleState && <MainModal handleToggle={handleToggle} state={state} />} */}
      <NewTimelineForm />
    </div>
  );
}

export default App;
