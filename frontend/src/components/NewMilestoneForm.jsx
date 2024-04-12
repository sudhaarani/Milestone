import React, { useState } from 'react';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';
import '../styles/Forms.css';


function NewMilestoneForm() {
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
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (
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
        <input type="file" name="images" id="milestone_images" onChange={images.handleMultiImageInput} multiple/>
        {imageError && <p style={{ color:'red' }}> {imageError} </p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
};

export default NewMilestoneForm;