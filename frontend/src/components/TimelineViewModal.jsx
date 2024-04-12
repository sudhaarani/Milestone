import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ handleToggle, state, searchKeyword, getClickedMilestone,
  handleMilestoneClicked,handleTimelineEditClicked,handleMilestoneEditClicked }) => {
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
      <button className="close-button" onClick={() => { handleToggle() }} >
        <img src={closeSymbol} alt='close symbol' />
      </button>
      {selectedTimeline &&
        (<div>
            {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} /> */}
            <p>{selectedTimeline.title}</p>
            <p>{selectedTimeline.description}</p>
          <div className="photo-details-modal__image">
          <MilestoneList state={state} getClickedMilestone={getClickedMilestone}
            handleMilestoneClicked={handleMilestoneClicked} handleMilestoneEditClicked={handleMilestoneEditClicked}
              />
          </div>
          <button onClick={() => { 
            handleTimelineEditClicked() 
          }}>Edit Timeline</button>
        </div>)}
    </div>
  )
};

export default TimelineViewModal;
