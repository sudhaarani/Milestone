import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ timelineToggle, state, searchKeyword, getClickedMilestone,
  milestoneToggle,timelineEditToggle,milestoneEditToggle }) => {
  const { selectedTimeline } = state;
  const [keyword, setKeyword] = useState('');
  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
    console.log(state.searchedMilestones);
  }
  // console.log(state.milestonesByTimeline)
  return (
    <div className='timeline-view-modal'>
      <SearchBar keyword={keyword} searchKeyword={searchKeyword} setKeyword={setKeyword} selectedTimeline={selectedTimeline} />
      <button className="close-button" onClick={() => { timelineToggle.handleToggle() }} >
        <img src={closeSymbol} alt='close symbol' />
      </button>
      {selectedTimeline &&
        (<div>
            {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} /> */}
            <p>{selectedTimeline.title}</p>
            <p>{selectedTimeline.description}</p>
          <div className="photo-details-modal__image">
          <MilestoneList state={state} getClickedMilestone={getClickedMilestone}
            milestoneToggle={milestoneToggle} milestoneEditToggle={milestoneEditToggle}
            timelineEditToggle={timelineEditToggle}
              />  
          </div>
          <button onClick={() => { 
            timelineEditToggle.handleToggle() 
          }}>Edit Timeline</button>
        </div>)}
    </div>
  )
};

export default TimelineViewModal;
