import React,{useState,useEffect} from 'react';

import '../styles/TimelineEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineEditModal = ({ state, searchKeyword, getClickedMilestone,
  handleMilestoneClicked,handleTimelineEditClicked,isTimelineEditClicked }) => {
  const { selectedTimeline } = state;
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  
  useEffect(() => {
    // Fetch the old value from your data source (e.g., database) based on the edit page's ID
    // Example: fetchOldValue(editPageId).then(value => setOldValue(value));

    setTitle(selectedTimeline.title);
    setDescription(selectedTimeline.description)
    setCoverImage(selectedTimeline.image)
  }, []);

  const handleTitle = (event) => {
    setTitle(event.target.value); // selects the value inputted into textfield
  };

  const handleDescription = (event) => {
    setDescription(event.target.value); 
  };

  const handleCoverImage = (event) => {
    setCoverImage(event.target.files[0]) // selects the image
  }

  const handleTimelineSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('coverimage', coverImage);
    formData.append('timeline_id', selectedTimeline.id);

    fetch('/api/timelines/update', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Saved Timeline Edit Form")
        // Reset form fields after successful submission
        // setTitle('');
        // setDescription('');
        // setCoverImage(null);
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
      <button className="close-button" onClick={() => { handleTimelineEditClicked() }} >
        <img src={closeSymbol} alt='close symbol' />
      </button>
      <form onSubmit={handleTimelineSave}>
      {selectedTimeline &&
        (<div>
            {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} /> */}
            {/* <img className="photo-details-modal__photographer-profile" src={selectedPhoto.user.profile} /> */}
            <div>
              <label>Title:</label>
              <input type="text" name="title" id="title" value={title} onChange={handleTitle} placeholder=""/>
            </div>
            <div>
              <label>Description:</label>
              <input type="text" name="description" id="description" value={description} onChange={handleDescription} placeholder=""/>
            </div>
            <div>
              <label>Cover Image:</label>
              <img src={`/uploads/${coverImage}`} className='card-img-top' alt={selectedTimeline.image} />
              <div>
                <input type="file" name="cover_image" id="cover_image" onChange={handleCoverImage} />
              </div>  
            </div>
          <div className="photo-details-modal__image">
          <MilestoneList state={state} getClickedMilestone={getClickedMilestone}
            handleMilestoneClicked={handleMilestoneClicked} isTimelineEditClicked={isTimelineEditClicked}
              />
          </div>
          <button>Add New Milestone</button>
          <button type="submit">Save</button>
          {/* once save clicked - go to the home page to see edited timeline */}
        </div>)}
      </form>
    </div>
  )
};

export default TimelineEditModal;
