import React,{useState} from 'react';

import '../styles/TimelineEditModal.css';
import MilestoneList from '../components/MilestoneList';
import NewMilestoneForm from '../components/NewMilestoneForm';
import SearchBar from '../components/SearchBar';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';

const TimelineEditModal = ({ state, searchKeyword, getClickedMilestone, handleHomePage,
  milestoneToggle, timelineEditToggle, milestoneEditToggle, handleDeleteMilestone, newMilestoneToggle,
  timelineToggle, handleSelectedTimeline, getMilestonesByTimeline, handleSearchByDate}) => {
  const { selectedTimeline } = state;

  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const title = useTextInput(selectedTimeline.title);
  const description = useTextInput(selectedTimeline.description);
  const coverImage = useImageInput(selectedTimeline.image);

  const handleTimelineSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title.textInput);
    formData.append('description', description.textInput);
    formData.append('image', coverImage.imageInput);
    formData.append('timeline_id', selectedTimeline.id);

    fetch('/api/timelines/update', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Saved Timeline Edit Form")
      } else {
        console.error('Failed to submit form');
      }
      return response.json();
    })
    .then(data => {
      /* Open up newly created timeline without refreshing : */
      timelineEditToggle.handleToggle(); //---> closes new timeline form
      timelineToggle.handleToggle(); //---> closes timeline view modal
      handleSelectedTimeline(data[0].id);
      handleHomePage();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
    console.log(state.searchedMilestones);
  }
  if (fromDate && toDate && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
  }

  return (
    <div>
      <div className='timeline-edit-modal'>
        <i className="fa-solid fa-arrow-left" onClick={() => { timelineEditToggle.handleToggle() }} />
        <h3 className='edit-modal-headers'>Edit Timeline</h3>

        {selectedTimeline &&
          (<div>
            <form className='edit-forms' onSubmit={handleTimelineSave}>
              <div>
                <label>Title</label>
                <input type="text" name="title" id="title" value={title.textInput} onChange={title.handleTextInput} placeholder=""/>
              </div>
              <div>
                <label>Description</label>
                <input type="text" name="description" id="description" value={description.textInput} onChange={description.handleTextInput} placeholder=""/>
              </div>
              <div>
                <label>Cover Image</label>
                <img src={selectedTimeline.timelineImageUrl} className='card-img-top' alt={selectedTimeline.image} />
                <div>
                  <label htmlFor="cover_image" className={`btn btn-outline-secondary btn-sm mt-3`}>
                    Edit cover image
                  </label>
                  <input className='file-input' type="file" id="cover_image" onChange={coverImage.handleImageInput} />
                </div>  
              </div>
              <button className="btn btn-info" type="submit" >
                <i class="fa-solid fa-circle-check"/> Save
              </button>
            </form>

            <h3 className='edit-modal-headers'>Edit Milestones</h3>
            <div className='timelineditmodal-search-container'>
            <SearchBar keyword={keyword} searchKeyword={searchKeyword} setKeyword={setKeyword} selectedTimeline={selectedTimeline}
            fromDate={fromDate} setFromDate={setFromDate}
            toDate={toDate} setToDate={setToDate} handleSearchByDate={handleSearchByDate}/>
            </div>

            <div>
              <MilestoneList state={state} getClickedMilestone={getClickedMilestone}
                  milestoneToggle={milestoneToggle} timelineEditToggle={timelineEditToggle}
                  milestoneEditToggle={milestoneEditToggle} handleDeleteMilestone={handleDeleteMilestone}
              />
            </div>
          
            {/* This button should open new-milestone-form modal */}
            <button className="btn btn-info" onClick={() => { newMilestoneToggle.handleToggle() }}>
              <i class="fa-solid fa-circle-plus"/> New Milestone
            </button>
          </div>)}
      </div>
    
      {newMilestoneToggle.toggleState && <NewMilestoneForm newMilestoneToggle={newMilestoneToggle} selectedTimeline={selectedTimeline} timelineEditToggle={timelineEditToggle} handleSelectedTimeline={handleSelectedTimeline} getMilestonesByTimeline={getMilestonesByTimeline} />}
    </div>
  )
};

export default TimelineEditModal;
