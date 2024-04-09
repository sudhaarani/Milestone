import './App.css';
import React from 'react';
import HomePage from './components/HomePage';
import TimelineEditModal from './components/TimelineEditModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';

import useApplicationData from "../src/hooks/useApplicationData";
import useToggle from "../src/hooks/useToggle";
import { useEffect, useState } from 'react';

function App() {
  const { state, handleSelectedTimeline } = useApplicationData();
  const { toggleState, handleToggle } = useToggle();

  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />

      <HomePage state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline} />

      {toggleState && <TimelineEditModal handleToggle={handleToggle} state={state} />}

      <NewTimelineForm />
    </div>
  );
}

export default App;
