import React,{useState,useEffect} from 'react';

import '../styles/TimelineEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';

//milestoneToggle} milestoneEditToggle
const TimelineEditModal = ({ state, searchKeyword, getClickedMilestone,
  milestoneToggle,timelineEditToggle,milestoneEditToggle }) => {
  const { selectedTimeline } = state;
  const [keyword, setKeyword] = useState('');
  const title = useTextInput(selectedTimeline.title);
  const description = useTextInput(selectedTimeline.description);
  const coverImage = useImageInput(null);
  
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
    formData.append('coverimage', coverImage.imageInput);
    formData.append('timeline_id', selectedTimeline.id);
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
  // console.log(state.milestonesByTimeline)
  return (
    <div className='timeline-edit-modal'>
      <SearchBar keyword={keyword} searchKeyword={searchKeyword} setKeyword={setKeyword} selectedTimeline={selectedTimeline} />
      <button className="close-button" onClick={() => { timelineEditToggle.handleToggle() }} >
        <img src={closeSymbol} alt='close symbol' />
      </button>
      
      {selectedTimeline &&
        (<div>
            {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} /> */}
            {/* <img className="photo-details-modal__photographer-profile" src={selectedPhoto.user.profile} /> */}
          <form onSubmit={handleTimelineSave}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" id="title" value={title.textInput} onChange={title.handleTextInput} placeholder=""/>
            </div>
            <div>
              <label>Description:</label>
              <input type="text" name="description" id="description" value={description.textInput} onChange={description.handleTextInput} placeholder=""/>
            </div>
            <div>
              <label>Cover Image:</label>
              <img src={selectedTimeline.timelineImageUrl} className='card-img-top' alt={selectedTimeline.image} />
              <div>
                <input type="file" id="cover_image" onChange={coverImage.handleImageInput} />
              </div>  
            </div>
            <button type="submit" onClick={() => { handleSaveClose() }}>Save</button>
          </form>
          <div className="photo-details-modal__image">
            <MilestoneList state={state} getClickedMilestone={getClickedMilestone}
                milestoneToggle={milestoneToggle} timelineEditToggle={timelineEditToggle}
                milestoneEditToggle={milestoneEditToggle}
            />
          </div>
        
          {/* This button should open new-milestone-form modal */}
          <button>Add New Milestone</button>
        </div>)}
      
    </div>
  )
};

export default TimelineEditModal;
