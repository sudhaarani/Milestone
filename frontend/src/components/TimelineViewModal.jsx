import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import '../styles/SearchBar.css';

import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ timelineToggle, state, searchKeyword, getClickedMilestone,
  milestoneToggle,timelineEditToggle,milestoneEditToggle,handleDeleteMilestone,handleSearchByDate, userId }) => {

  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
  }
  if (fromDate && toDate && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
  }

  const { selectedTimeline } = state;

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
          <h2>{selectedTimeline.title}</h2>
          <p>{selectedTimeline.description}</p>

          <MilestoneList state={state} getClickedMilestone={getClickedMilestone} milestoneToggle={milestoneToggle} milestoneEditToggle={milestoneEditToggle}
            timelineEditToggle={timelineEditToggle} handleDeleteMilestone={handleDeleteMilestone} />
          
          
          {/* if the logged in user === owner of selected timeline in the modal... */}
          {userId === selectedTimeline.user_id &&
          (<button className="btn btn-dark" onClick={() => { timelineEditToggle.handleToggle() }}>
            Edit Timeline
          </button>)}

        </div>)
      }
    </div>
  )
};

export default TimelineViewModal;