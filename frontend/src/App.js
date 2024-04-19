import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import HomePage from './components/HomePage';
import TimelineViewModal from './components/TimelineViewModal';
import TimelineEditModal from './components/TimelineEditModal';
import MilestoneViewModal from './components/MilestoneViewModal';
import MilestoneEditModal from './components/MilestoneEditModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';
import NewMilestoneForm from './components/NewMilestoneForm';
import MyTimelines from './components/MyTimelines';
import FavouritesPage from './components/FavouritesPage';

import useApplicationData from "./hooks/useApplicationData"; // Adjusted the path for hooks
import useToggle from "./hooks/useToggle";

function App() {
  const { state, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline,
    handleSearchByDate,handleHomePage,handleFavouritesPage, getTimelinesOf1User,
    searchKeyword, getClickedMilestone,handleDeleteTimeline,handleDeleteMilestone } = useApplicationData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const timelineToggle = useToggle();
  const milestoneToggle = useToggle(); 
  const timelineEditToggle = useToggle();
  const milestoneEditToggle = useToggle(); 
  const newMilestoneToggle = useToggle();

  return (
    <Router> {/* Use Router to wrap the application */}
      <div className="App">
        <NavBar handleFavouritesPage={handleFavouritesPage}
          handleHomePage={handleHomePage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          getTimelinesOf1User={getTimelinesOf1User} />

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage
            isLoggedIn={isLoggedIn} 
            timelineToggle={timelineToggle} 
            state={state} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            getMilestonesByTimeline={getMilestonesByTimeline}
            getTimelinesOf1User={getTimelinesOf1User} />} 
            timelineEditToggle={timelineEditToggle}
            handleDeleteTimeline={handleDeleteTimeline} 
          />
          <Route path="/create-new" element={<NewTimelineForm />} />

          <Route path="/timelines/:id" element={<MyTimelines 
            state={state}
            timelineToggle={timelineToggle}
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            isLoggedIn={isLoggedIn}
            getMilestonesByTimeline={getMilestonesByTimeline}
            getTimelinesOf1User={getTimelinesOf1User}
            timelineEditToggle={timelineEditToggle}
            handleDeleteTimeline={handleDeleteTimeline} />} 
          />

          <Route path="/favourites" element={<FavouritesPage
            state={state} 
            timelineToggle={timelineToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            isLoggedIn={isLoggedIn}
            getMilestonesByTimeline={getMilestonesByTimeline}
            getTimelinesOf1User={getTimelinesOf1User}
            timelineEditToggle={timelineEditToggle}
            handleDeleteTimeline={handleDeleteTimeline}
           />} />
        </Routes>


        {timelineToggle.toggleState && <TimelineViewModal timelineToggle={timelineToggle} state={state}
        searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone}
        milestoneToggle={milestoneToggle} timelineEditToggle={timelineEditToggle}
        milestoneEditToggle={milestoneEditToggle} handleDeleteMilestone={handleDeleteMilestone}
        handleSearchByDate={handleSearchByDate}/>
  }
        {milestoneToggle.toggleState && <MilestoneViewModal milestoneToggle={milestoneToggle} state={state} />}

        {timelineEditToggle.toggleState && <TimelineEditModal timelineEditToggle={timelineEditToggle}
        state={state} searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone}
        milestoneToggle={milestoneToggle} milestoneEditToggle={milestoneEditToggle} handleDeleteMilestone={handleDeleteMilestone}
        newMilestoneToggle={newMilestoneToggle}
        />}
              
        {milestoneEditToggle.toggleState && <MilestoneEditModal milestoneEditToggle={milestoneEditToggle} state={state} />}

        {newMilestoneToggle.toggleState && <NewMilestoneForm newMilestoneToggle={newMilestoneToggle}/>} 
      </div>
    </Router>  
  );
}

export default App;