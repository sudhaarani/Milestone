import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ timelineToggle, state, searchKeyword, getClickedMilestone, milestoneToggle}) => {
  const { selectedTimeline } = state;
  const [keyword, setKeyword] = useState('');
  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
    console.log(state.searchedMilestones);
  }

  return (
    <div className='timeline-milestone-modal'>
      <div className='timeline-top'>
        <div className="search-bar-wrap">
        <SearchBar keyword={keyword} searchKeyword={searchKeyword} setKeyword={setKeyword} selectedTimeline={selectedTimeline} />
        </div>

        <div className="close-button-wrap">
            <button className="close-button" onClick={() => { timelineToggle.handleToggle(); }} >
              <img src={closeSymbol} alt='close symbol' />
            </button>
        </div>

      </div>



      {selectedTimeline &&
        (<div>
          <h2>{selectedTimeline.title}</h2>
          <p>{selectedTimeline.description}</p>
          <MilestoneList state={state} getClickedMilestone={getClickedMilestone} milestoneToggle={milestoneToggle} />
          <button className="btn btn-dark">Edit Timeline</button>
        </div>)}

    </div>
  )
};

export default TimelineViewModal;
