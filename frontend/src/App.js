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


  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />

      <HomePage state={state} timelineToggle={timelineToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites} getMilestonesByTimeline={getMilestonesByTimeline} />

      {timelineToggle.toggleState && <TimelineViewModal timelineToggle={timelineToggle} state={state} searchKeyword={searchKeyword} getClickedMilestone={getClickedMilestone} milestoneToggle={milestoneToggle} />}

      {/* {toggleState && <MainModal handleToggle={handleToggle} state={state} />} */}

      {milestoneToggle.toggleState && <MilestoneViewModal milestoneToggle={milestoneToggle} state={state} />}

      <NewTimelineForm />

    </div>
  );
}

export default App;
