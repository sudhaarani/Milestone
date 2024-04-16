import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import '../styles/SearchBar.css';

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
      <div className='timeline-top'>

        <SearchBar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword}
        selectedTimeline={selectedTimeline} fromDate={fromDate} setFromDate={setFromDate}
        toDate={toDate} setToDate={setToDate} handleSearchByDate={handleSearchByDate} />

        <div className="close-button-wrap">
          <button className="close-button" onClick={() => { timelineToggle.handleToggle(); }} >
            <img src={closeSymbol} alt='close symbol' />
          </button>
        </div>

      </div>

      {selectedTimeline &&
        (<div>
          {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} />
          <img className="photo-details-modal__photographer-profile" src={selectedPhoto.user.profile} /> */ }
          <h2>{selectedTimeline.title}</h2>
          <p>{selectedTimeline.description}</p>
          <MilestoneList state={state} getClickedMilestone={getClickedMilestone} milestoneToggle={milestoneToggle} />
          <button className="btn btn-dark">Edit Timeline</button>
        </div>)}

    </div>
  )
};

export default TimelineViewModal;