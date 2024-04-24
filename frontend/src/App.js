import './App.css';
import React, {useState, useEffect} from 'react';
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
    searchKeyword, getClickedMilestone,handleDeleteTimeline,handleDeleteMilestone, handleFollowedUsers, handleFollowingPage } = useApplicationData();
  
  // UserAuth: 
  const [userId, setUserId] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserId(user.id); // Set userId when the app is loaded
    }
  }, []);

  // Displaying Modals: 
  const timelineToggle = useToggle();
  const milestoneToggle = useToggle(); 
  const timelineEditToggle = useToggle();
  const milestoneEditToggle = useToggle(); 
  const newMilestoneToggle = useToggle();
  const newTimelineToggle = useToggle();


  return (
    <Router> {/* Use Router to wrap the application */}
      <div className="App">
        <NavBar 
          handleFavouritesPage={handleFavouritesPage} 
          handleHomePage={handleHomePage} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          getTimelinesOf1User={getTimelinesOf1User} 
          userId={userId} // Passing userId as a prop to NavBar
          setUserId={setUserId} // Passing setUserId as a prop to NavBar
          newTimelineToggle={newTimelineToggle}
          handleFollowingPage={handleFollowingPage}
        />

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage
            isLoggedIn={isLoggedIn} 
            timelineToggle={timelineToggle} 
            state={state} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            getMilestonesByTimeline={getMilestonesByTimeline}
            getTimelinesOf1User={getTimelinesOf1User} 
            timelineEditToggle={timelineEditToggle}
            handleDeleteTimeline={handleDeleteTimeline}
            handleFollowedUsers={handleFollowedUsers}
            userId={userId}
            />} 
          />

          <Route path="/following" element={<HomePage
            isLoggedIn={isLoggedIn} 
            timelineToggle={timelineToggle} 
            state={state} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            getMilestonesByTimeline={getMilestonesByTimeline}
            getTimelinesOf1User={getTimelinesOf1User} 
            timelineEditToggle={timelineEditToggle}
            handleDeleteTimeline={handleDeleteTimeline}
            handleFollowedUsers={handleFollowedUsers}
            userId={userId}
            />} 
          />
          
          <Route path="/timelines/:id" element={<MyTimelines 
            state={state}
            timelineToggle={timelineToggle}
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            isLoggedIn={isLoggedIn}
            getMilestonesByTimeline={getMilestonesByTimeline}
            getTimelinesOf1User={getTimelinesOf1User}
            timelineEditToggle={timelineEditToggle}
            handleDeleteTimeline={handleDeleteTimeline} 
            handleFollowedUsers={handleFollowedUsers} 
            userId={userId}/>} 
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
            handleFollowedUsers={handleFollowedUsers}
            userId={userId} />}
          />
        </Routes>


        {timelineToggle.toggleState && 
          <TimelineViewModal 
            timelineToggle={timelineToggle}
            state={state}
            searchKeyword={searchKeyword}
            getClickedMilestone={getClickedMilestone}
            milestoneToggle={milestoneToggle}
            timelineEditToggle={timelineEditToggle}
            milestoneEditToggle={milestoneEditToggle}
            handleDeleteMilestone={handleDeleteMilestone}
            handleSearchByDate={handleSearchByDate}
            userId={userId}
            handleDeleteTimeline={handleDeleteTimeline}
          />
        }


        {milestoneToggle.toggleState && <MilestoneViewModal milestoneToggle={milestoneToggle} state={state} />}

        {timelineEditToggle.toggleState && <TimelineEditModal timelineEditToggle={timelineEditToggle}
        state={state} searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone}
        milestoneToggle={milestoneToggle} milestoneEditToggle={milestoneEditToggle} handleDeleteMilestone={handleDeleteMilestone} newMilestoneToggle={newMilestoneToggle} handleSelectedTimeline={handleSelectedTimeline} getMilestonesByTimeline={getMilestonesByTimeline}
        />}
              
        {milestoneEditToggle.toggleState && <MilestoneEditModal milestoneEditToggle={milestoneEditToggle} timelineEditToggle={timelineEditToggle} state={state} handleSelectedTimeline={handleSelectedTimeline} getMilestonesByTimeline={getMilestonesByTimeline} />}

        {newTimelineToggle.toggleState && <NewTimelineForm newTimelineToggle={newTimelineToggle} timelineToggle={timelineToggle} handleSelectedTimeline={handleSelectedTimeline} getMilestonesByTimeline={getMilestonesByTimeline} />}
        
      </div>
    </Router>  
  );
}

export default App;