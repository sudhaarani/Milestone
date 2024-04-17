import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import HomePage from './components/HomePage';
import MainModal from './components/MainModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';
import NewMilestoneForm from './components/NewMilestoneForm';
import MyTimelines from './components/MyTimelines';

import useApplicationData from "./hooks/useApplicationData"; // Adjusted the path for hooks
import useToggle from "./hooks/useToggle";

function App() {
  const { state, handleSelectedTimeline, handleFavourites, resetSelectedUser } = useApplicationData();
  const { toggleState, handleToggle} = useToggle();

  return (
    <Router> {/* Use Router to wrap the application */}
      <div className="App">
        <NavBar isLoggedIn={true} username={"Labber"}resetSelectedUser={resetSelectedUser}/>

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage 
            state={state} 
            handleToggle={handleToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites} 
          />} />
          <Route path="/create-new" element={<NewTimelineForm />} />
          {/* You can add more routes here for other components */}
          <Route path="/timelines/:id" element={<MyTimelines 
            state={state} 
            handleToggle={handleToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites} 
          />} />
        </Routes>

        {toggleState && <MainModal handleToggle={handleToggle} state={state} />}
        {/* Consider if MainModal should be part of a route or conditional rendering */}
  
        <NewMilestoneForm />
      </div>
    </Router>
  );
}

export default App;
