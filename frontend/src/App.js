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
  const { state, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline,searchKeyword,getClickedMilestone,handleSearchByDate, handleHomePage, handleFavouritesPage, resetSelectedUser  } = useApplicationData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Old code for opening/closing TIMELINE MODAL */
    // const { toggleState, handleToggle } = useToggle(); 
  
  /* Old code for opening/closing MILESTONE MODAL */
    // const [isMilestoneClicked, setIsMilestoneClicked] = useState(false);
    // const handleMilestoneClicked= () => {
    //   setIsMilestoneClicked(!isMilestoneClicked);  
    // };
    
  /* New code for opening/closing TIMELINE AND MILESTONE MODAL (passed down these 2 variables) */
  const timelineToggle = useToggle();
  const milestoneToggle = useToggle(); 
      // eg. get the state: milestoneToggle.toggleState
      // eg. get the function to set state: milestoneToggle.handleToggle();



  const [isTimelineEditClicked, setIsTimelineEditClicked] = useState(false);
  const [isMilestoneEditClicked, setIsMilestoneEditClicked] = useState(false);
    
  const handleMilestoneEditClicked= () => {
    setIsMilestoneEditClicked(!isMilestoneEditClicked);  
  };
  const handleTimelineEditClicked= () => {
    setIsTimelineEditClicked(!isTimelineEditClicked);  
  };

  return (
    <Router> {/* Use Router to wrap the application */}
      <div className="App">
        <NavBar username={"Labber"} handleFavouritesPage={handleFavouritesPage} handleHomePage={handleHomePage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} resetSelectedUser={resetSelectedUser} />

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            timelineToggle={timelineToggle} 
            state={state} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            getMilestonesByTimeline={getMilestonesByTimeline}/>} 
          />

          <Route path="/create-new" element={<NewTimelineForm />} />

          <Route path="/timelines/:id" element={<MyTimelines 
            state={state}
            timelineToggle={timelineToggle}  
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites} 
            isLoggedIn={isLoggedIn} />} 
          />

          <Route path="/favourites" element={<FavouritesPage
            state={state} 
            timelineToggle={timelineToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            isLoggedIn={isLoggedIn} 
           />} />
        </Routes>


        {timelineToggle.toggleState && <TimelineViewModal timelineToggle={timelineToggle} state={state} searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone} handleSearchByDate={handleSearchByDate} milestoneToggle={milestoneToggle} />}

        {milestoneToggle.toggleState && <MilestoneViewModal milestoneToggle={milestoneToggle} state={state} />}

        {isTimelineEditClicked && <TimelineEditModal handleTimelineEditClicked={handleTimelineEditClicked} state={state} />}
        
        {isMilestoneEditClicked && <MilestoneEditModal handleMilestoneEditClicked={handleMilestoneEditClicked} state={state} />}

        <NewMilestoneForm />
      </div>
    </Router>
  );
}

export default App;
