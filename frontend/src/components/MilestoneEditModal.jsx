
import React,{useState,useEffect} from 'react';

import '../styles/MilestoneEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';

const MilestoneEditModal = ({ state,handleMilestoneEditClicked }) => {
  const { selectedMilestone } = state;
  console.log("selectedMilestone:", selectedMilestone);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [diary_entry, setDiary_entry] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const isoDate = new Date(selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
 
  
  useEffect(() => {
    setTitle(selectedMilestone.milestone_title);
    setDate(formattedDate);
    setDiary_entry(selectedMilestone.diary_entry);
    setImage1(selectedMilestone.image1);
    setImage2(selectedMilestone.image2);
    setImage3(selectedMilestone.image3);
    setImage4(selectedMilestone.image4);
  }, []);

  const handleTitle = (event) => {
    setTitle(event.target.value); // selects the value inputted into textfield
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleDiary_entry= (event) => {
    setDiary_entry(event.target.value);
  };

  const handleImage1 = (event) => {
    setImage1(event.target.files[0]) // selects the image
  }
  const handleImage2 = (event) => {
    setImage1(event.target.files[0]) // selects the image
  }
  const handleImage3 = (event) => {
    setImage1(event.target.files[0]) // selects the image
  }
  const handleImage4 = (event) => {
    setImage1(event.target.files[0]) // selects the image
  }

  //to close the modal once save btn is clicked and form has submitted(form has to be
  //submitted before it closes so delaying one sec)
  const handleSaveClose = () => {
    setTimeout(() => {
      handleMilestoneEditClicked();
    }, 1000); // Delay of 1 second (1000 milliseconds)
  };

  const handleTimelineSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('diary_entry', diary_entry);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('image4', image4);
    formData.append('Milestone_id', selectedMilestone.milestone_id);
    //throws error when we save without editing image ---> have to look

    fetch('/api/milestones/update', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Saved Milestone Edit Form")
      } else {
        console.error('Failed to submit form');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }
  // console.log(state.milestonesByTimeline)
  return (
    <div className='milestone-edit-modal'>
      <button className="close-button" onClick={() => { handleMilestoneEditClicked() }} >
        <img src={closeSymbol} alt='close symbol' />
      </button>
      
      {selectedMilestone &&
        (<div>
            {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} /> */}
            {/* <img className="photo-details-modal__photographer-profile" src={selectedPhoto.user.profile} /> */}
          <form onSubmit={handleTimelineSave}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" id="title" value={title} onChange={handleTitle} placeholder=""/>
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" id="date" value={date} onChange={handleDate} placeholder=""/>
            </div>
            <div>
              <label>Diary Entry:</label>
              <input type="text" name="diary_entry" id="diary_entry" value={diary_entry} onChange={handleDiary_entry} placeholder=""/>
            </div>
            <div>
              <label>Images:</label>
              <img src={selectedMilestone.image1} className='card-img-top' alt={selectedMilestone.image1} />
            <div>
                <input type="file" name="image1" id="image1" onChange={handleImage1} />
              </div>
            </div>
            <button type="submit" onClick={() => { handleSaveClose() }}>Save</button>
          </form>
        </div>)}
      
    </div>
  )
};

export default MilestoneEditModal;
