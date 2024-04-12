import './App.css';
import React,{useState} from 'react';
import HomePage from './components/HomePage';
import TimelineViewModal from './components/TimelineViewModal';
import TimelineEditModal from './components/TimelineEditModal';
import MilestoneViewModal from './components/MilestoneViewModal';
import MilestoneEditModal from './components/MilestoneEditModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';

import useApplicationData from "../src/hooks/useApplicationData";
import useToggle from "../src/hooks/useToggle";


function App() {
  const { state, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline,
    searchKeyword, getClickedMilestone } = useApplicationData();
  const timelineToggle = useToggle();
  const milestoneToggle = useToggle(); 
  const timelineEditToggle = useToggle();
  const milestoneEditToggle = useToggle(); 

  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />

      <HomePage state={state} timelineToggle={timelineToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites} getMilestonesByTimeline={getMilestonesByTimeline}
        timelineEditToggle={timelineEditToggle} />

      {timelineToggle.toggleState && <TimelineViewModal timelineToggle={timelineToggle} state={state}
        searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone}
        milestoneToggle={milestoneToggle} timelineEditToggle={timelineEditToggle}
        milestoneEditToggle={milestoneEditToggle} />}
      
      {timelineEditToggle.toggleState && <TimelineEditModal timelineEditToggle={timelineEditToggle}
        state={state} searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone}
        milestoneToggle={milestoneToggle} milestoneEditToggle={milestoneEditToggle}
      />}
      
      {milestoneToggle.toggleState && <MilestoneViewModal milestoneToggle={milestoneToggle} state={state} />}
      
      {milestoneEditToggle.toggleState && <MilestoneEditModal milestoneEditToggle={milestoneEditToggle} state={state} />}
      
      <NewTimelineForm />
    </div>  
  );
}

export default App;
