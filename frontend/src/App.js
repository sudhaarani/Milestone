import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import HomePage from './components/HomePage';
import MainModal from './components/MainModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';

import useApplicationData from "./hooks/useApplicationData"; // Adjusted the path for hooks
import useToggle from "./hooks/useToggle";

function App() {
  const { state, handleSelectedTimeline, handleFavourites } = useApplicationData();
  const { toggleState, handleToggle} = useToggle();

  return (
    <Router> {/* Use Router to wrap the application */}
      <div className="App">
        <NavBar isLoggedIn={true} username={"Labber"} />

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage 
            state={state} 
            handleToggle={handleToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites} 
          />} />
          <Route path="/new-timeline" element={<NewTimelineForm />} />
          {/* You can add more routes here for other components */}
        </Routes>

        {toggleState && <MainModal handleToggle={handleToggle} state={state} />}
        {/* Consider if MainModal should be part of a route or conditional rendering */}
      </div>
    </Router>
  );
}

export default App;
