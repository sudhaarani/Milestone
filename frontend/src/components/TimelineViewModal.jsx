import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ timelineToggle, state, searchKeyword,handleSearchByDate, getClickedMilestone, milestoneToggle}) => {
  const { selectedTimeline } = state;
  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
    console.log(state.searchedMilestones);
  }
  if (fromDate && toDate && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
    console.log(state.searchedMilestones);
  }
  // console.log(state.milestonesByTimeline)

  return (
    <div className='timeline-milestone-modal'>

      <div className="close-button-wrap">
        <button className="close-button" onClick={() => { timelineToggle.handleToggle(); }} >
          <img src={closeSymbol} alt='close symbol' />
        </button>
      </div>

      <SearchBar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword}
        selectedTimeline={selectedTimeline} fromDate={fromDate} setFromDate={setFromDate}
        toDate={toDate} setToDate={setToDate} handleSearchByDate={handleSearchByDate} />

      {selectedTimeline &&
        (<div>
          {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} />
          <img className="photo-details-modal__photographer-profile" src={selectedPhoto.user.profile} /> */ }
          <h3>{selectedTimeline.title}</h3>
          <p>{selectedTimeline.description}</p>
          <div className="photo-details-modal__image">
              <MilestoneList state={state} getClickedMilestone={getClickedMilestone} milestoneToggle={milestoneToggle} />
          </div>
          <button>Edit Timeline</button>
        </div>)}

    </div>
  )
};

export default TimelineViewModal;
