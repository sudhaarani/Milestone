import './App.css';
import React,{useState} from 'react';
import HomePage from './components/HomePage';
import MainModal from './components/MainModal';
import TimelineViewModal from './components/TimelineViewModal';

import MilestoneViewModal from './components/MilestoneViewModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';

import useApplicationData from "../src/hooks/useApplicationData";
import useToggle from "../src/hooks/useToggle";


function App() {
  const { state, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline,searchKeyword,getClickedMilestone } = useApplicationData();
  const { toggleState, handleToggle } = useToggle();
  const [isMilestoneClicked, setIsMilestoneClicked] = useState(false);
  const handleMilestoneClicked= () => {
    setIsMilestoneClicked(!isMilestoneClicked);  
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />

      <HomePage state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites} getMilestonesByTimeline={getMilestonesByTimeline} />

      {toggleState && <TimelineViewModal handleToggle={handleToggle} state={state} searchKeyword={searchKeyword}
        getClickedMilestone={getClickedMilestone} handleMilestoneClicked={handleMilestoneClicked} />}
      {/* {toggleState && <MainModal handleToggle={handleToggle} state={state} />} */}
      {isMilestoneClicked && <MilestoneViewModal handleMilestoneClicked={handleMilestoneClicked} state={state} />}
      <NewTimelineForm />
    </div>
  );
}

export default App;
