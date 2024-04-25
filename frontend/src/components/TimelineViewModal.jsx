import React,{useState} from 'react';

import '../styles/TimelineViewModal.css';
import '../styles/SearchBar.css';

import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ timelineToggle, state, searchKeyword, getClickedMilestone,
  milestoneToggle, timelineEditToggle, milestoneEditToggle, handleDeleteMilestone, handleSearchByDate, handleDeleteTimeline, userId }) => {

  const { selectedTimeline } = state;

  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
  }
  if (fromDate && toDate && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
  }
 
  const displayDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  const confirmDelete = () => {
    handleDeleteTimeline(selectedTimeline.id);
    timelineToggle.handleToggle();
    setShowDeleteConfirmation(false); // hide confirmation question after deleting
  };

  return (
    <div className='timeline-milestone-modal'>
      <div className='timeline-top'>

        <SearchBar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword}
        selectedTimeline={selectedTimeline} fromDate={fromDate} setFromDate={setFromDate}
        toDate={toDate} setToDate={setToDate} handleSearchByDate={handleSearchByDate} />

        <div className="close-button-wrap">
          <button className="close-button-new" onClick={() => { timelineToggle.handleToggle(); }} >
            <img src={closeSymbol} alt='close symbol' />
          </button>
        </div>
      </div>

      {selectedTimeline &&
        (<div>
          <h2>{selectedTimeline.title}</h2>
          <p className='timeline-view-description'>{selectedTimeline.description}</p>

          <MilestoneList state={state} getClickedMilestone={getClickedMilestone} milestoneToggle={milestoneToggle} milestoneEditToggle={milestoneEditToggle} timelineEditToggle={timelineEditToggle} handleDeleteMilestone={handleDeleteMilestone} />

          {state.milestonesByTimeline.length === 0 && <p className='timeline-view-milestone-status'>NO MILESTONES YET </p>}         
          {userId === selectedTimeline.user_id &&
            (<div className='timeline-bottom'>
              {showDeleteConfirmation && (
                <div className="delete-confirmation">
                  Are you sure you want to delete?
                  <i class="fa-solid fa-check" onClick={confirmDelete} ></i>
                  <i class="fa-solid fa-xmark" onClick={cancelDelete}></i>
                </div>)}                

              <button className='btn btn-outline-info' onClick={() => { timelineEditToggle.handleToggle()}}>
                <i class="fa-solid fa-pen" id='timeline-edit-button'/>
              </button>

              <button className='btn btn-outline-dark' onClick={() => {displayDeleteConfirmation()}} >
                <i class="fa-solid fa-trash" id='timeline-edit-button'/>
              </button>
            </div>)}
            
        </div>)}
    </div>
  )
};

export default TimelineViewModal;