import React, { useState } from 'react';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';
import '../styles/forms.css';
import closeSymbol from '../assets/closeSymbol.svg';
//close button to close the form modal

function NewMilestoneForm({newMilestoneToggle, timelineEditToggle, selectedTimeline, handleSelectedTimeline, getMilestonesByTimeline }) {
  const title = useTextInput('');
  const date = useTextInput('');
  const diaryEntry = useTextInput('');
  const images = useImageInput([]);

  const [imageError, setImageError] = useState('');


  const handleNewMilestoneSubmit = (event) => {
    event.preventDefault();

    if (images.imageInput.length > 4) {
      setImageError('Maximum of 4 images allowed.');
      return;
    }

    const formData = new FormData();
      formData.append('timeline_id', selectedTimeline.id);
      formData.append('title', title.textInput);
      formData.append('date', date.textInput);
      formData.append('diary_entry', diaryEntry.textInput);
      for (let i = 0; i < images.imageInput.length; i++) {
        formData.append('images', images.imageInput[i]);
      }

    fetch('/api/milestones', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Submitted Milestone Form")
      } else {
        console.error('Failed to submit form');
      }
    })
    .then(data => {
      console.log("NEW MILESTONE FORM DATA: ",data)
      /* Show newly created milestone without refreshing : */
      newMilestoneToggle.handleToggle(); //---> closes new milestone form
      timelineEditToggle.handleToggle(); //---> closes timeline edit modal
      handleSelectedTimeline(selectedTimeline.id); //sending timeline_id
      getMilestonesByTimeline(selectedTimeline.id);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (//new-milestone-modal
    <div className='new-milestone-modal'>
      <div className="close-button-wrap">
          <button className="close-button-new" onClick={() => { newMilestoneToggle.handleToggle(); }} >
            <img src={closeSymbol} alt='close symbol' />
          </button>
      </div>

      <h1>Create New Milestone</h1>

      <form onSubmit={handleNewMilestoneSubmit} encType="multipart/form-data">
        <div>
          <label>Milestone Title: </label>
          <input type="text" id="milestone_title" value={title.textInput} onChange={title.handleTextInput} required />
        </div>
        <div>
          <label>Date: </label>
          <input type="date" id="milestone_date" value={date.textInput} onChange={date.handleTextInput} required />
        </div>

        <div>
          <label>Diary Entry: </label>
          <textarea id="diary_entry" className="diary_entry" value={diaryEntry.textInput} onChange={diaryEntry.handleTextInput}></textarea>
        </div>

        <div>
          <label className='new-milestone-addphoto-message'>Add Max of 4 images</label>
          <input type="file" name="images" id="milestone_images" onChange={images.handleMultiImageInput} multiple/>
          
          {imageError && <p style={{ color:'red' }}> {imageError} </p>}
        </div>

        <button className='btn btn-info' type="submit">
          <i class="fa-solid fa-file-import"/> Submit
        </button>
      </form>
      
    </div>
  )
};

export default NewMilestoneForm;