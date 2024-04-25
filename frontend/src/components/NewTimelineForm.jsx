import React from 'react';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';
import '../styles/forms.css';
import closeSymbol from '../assets/closeSymbol.svg';


function NewTimelineForm({ newTimelineToggle, handleHomePage }) {
  const title = useTextInput('');
  const description = useTextInput('');
  const coverImage = useImageInput(null);

  const handleNewTimelineSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
      formData.append('title', title.textInput);
      formData.append('description', description.textInput);
      formData.append('coverimage', coverImage.imageInput);

    fetch('/api/timelines', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Submitted Timeline Form")
        return response.json();
      } else {
        console.error('Failed to submit form');
      }
    })
    .then(data => {
      /* View newly created timeline without refreshing : */
      newTimelineToggle.handleToggle(); //---> closes new timeline form
      handleHomePage();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div className='new-timeline-modal'>
      <div className="close-button-wrap">
        <button className="close-button-new" onClick={() => { newTimelineToggle.handleToggle()}}> 
          <img src={closeSymbol} alt='close symbol' />
        </button>
      </div>

      <h1>Create New Timeline</h1>

      <form className='edit-forms' onSubmit={handleNewTimelineSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" id="timeline_title" value={title.textInput} onChange={title.handleTextInput} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" id="timeline_description" value={description.textInput} onChange={description.handleTextInput} />
        </div>
        <div>
          <input type="file" id="timeline_cover" onChange={coverImage.handleImageInput} />
        </div>

        <button className='btn btn-info' type="submit">
          <i class="fa-solid fa-file-import"/> Submit
        </button>
      </form>
    </div>
  )
};

export default NewTimelineForm;


