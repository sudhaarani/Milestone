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
  const { state, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline,searchKeyword,getClickedMilestone } = useApplicationData();
  const { toggleState, handleToggle } = useToggle();
  const [isMilestoneClicked, setIsMilestoneClicked] = useState(false);
  const [isTimelineEditClicked, setIsTimelineEditClicked] = useState(false);
  const [isMilestoneEditClicked, setIsMilestoneEditClicked] = useState(false);
  const handleMilestoneClicked= () => {
    setIsMilestoneClicked(!isMilestoneClicked);  
  };

  const handleMilestoneEditClicked= () => {
    setIsMilestoneEditClicked(!isMilestoneEditClicked);  
  };
  const handleTimelineEditClicked= () => {
    setIsTimelineEditClicked(!isTimelineEditClicked);  
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />

      <HomePage state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites} getMilestonesByTimeline={getMilestonesByTimeline}
        handleTimelineEditClicked={handleTimelineEditClicked} />

      {toggleState && <TimelineViewModal handleToggle={handleToggle} state={state} searchKeyword={searchKeyword}
        getClickedMilestone={getClickedMilestone} handleMilestoneClicked={handleMilestoneClicked}
        handleTimelineEditClicked={handleTimelineEditClicked} />}
      {isTimelineEditClicked && <TimelineEditModal handleTimelineEditClicked={handleTimelineEditClicked} state={state}
        isTimelineEditClicked={isTimelineEditClicked} searchKeyword={searchKeyword}
        getClickedMilestone={getClickedMilestone} handleMilestoneClicked={handleMilestoneClicked}/>}
      {isMilestoneClicked && <MilestoneViewModal handleMilestoneClicked={handleMilestoneClicked} state={state} />}
      {isMilestoneEditClicked && <MilestoneEditModal handleMilestoneEditClicked={handleMilestoneEditClicked} state={state} />}
      <NewTimelineForm />
    </div>
  );
}

export default App;
