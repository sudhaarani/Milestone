import React,{useState,useEffect} from 'react';

import '../styles/TimelineEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import NewMilestoneForm from '../components/NewMilestoneForm';
import SearchBar from '../components/SearchBar';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';

const TimelineEditModal = ({ state, searchKeyword, getClickedMilestone,
  milestoneToggle,timelineEditToggle,milestoneEditToggle,handleDeleteMilestone,newMilestoneToggle }) => {
  const { selectedTimeline } = state;
  console.log("selectedTimeline:", selectedTimeline);

  const [keyword, setKeyword] = useState('');
  const title = useTextInput(selectedTimeline.title);
  const description = useTextInput(selectedTimeline.description);
  const coverImage = useImageInput(selectedTimeline.image);
  //to close the modal once save btn is clicked and form has submitted(form has to be 
  //submitted before it closes so delaying one sec)
  const handleSaveClose = () => { 
    setTimeout(() => {
      timelineEditToggle.handleToggle();
    }, 1000); // Delay of 1 second (1000 milliseconds)
  };

  const handleTimelineSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title.textInput);
    formData.append('description', description.textInput);
    formData.append('image', coverImage.imageInput);
    formData.append('timeline_id', selectedTimeline.id);
    //console.log("coverImage.imageInput.name:", coverImage.imageInput.name);
    //throws error when we save without editing image ---> have to look
    //implement post req update query in milestones.js //upload multiple images
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
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  if (keyword && state.searchedMilestones) {
    state = { ...state, milestonesByTimeline: state.searchedMilestones }
    console.log(state.searchedMilestones);
  }

  return (
    <div>
      <div className='timeline-edit-modal'>
        <i className="fa-solid fa-arrow-left" onClick={() => { timelineEditToggle.handleToggle() }} />
        <h3 style={{marginTop:'50px'}}>Edit Timeline</h3>

        {selectedTimeline &&
          (<div>
            <form style={{backgroundColor:'#F0F2F5', margin:'0px 20px', padding:'10px', borderRadius:'10px'}} onSubmit={handleTimelineSave}>
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
                  <input style={{margin:'10px'}} type="file" id="cover_image" onChange={coverImage.handleImageInput} />
                </div>  
              </div>
              <button className="btn btn-info" type="submit" onClick={() => { handleSaveClose() }}>Save</button>
            </form>

            <h3 style={{marginTop:'50px'}}>Edit Milestones</h3>
            <div className='timelineditmodal-search-container'>
              <SearchBar keyword={keyword} searchKeyword={searchKeyword} setKeyword={setKeyword} selectedTimeline={selectedTimeline} />
            </div>

            <div>
              <MilestoneList state={state} getClickedMilestone={getClickedMilestone}
                  milestoneToggle={milestoneToggle} timelineEditToggle={timelineEditToggle}
                  milestoneEditToggle={milestoneEditToggle} handleDeleteMilestone={handleDeleteMilestone}
              />
            </div>
          
            {/* This button should open new-milestone-form modal */}
            <button className="btn btn-info" onClick={() => { newMilestoneToggle.handleToggle() }}>+ Add New Milestone</button>
          </div>)}
      </div>
    
      {newMilestoneToggle.toggleState && <NewMilestoneForm newMilestoneToggle={newMilestoneToggle} selectedTimeline={selectedTimeline} />}
    </div>
  )
};

export default TimelineEditModal;
