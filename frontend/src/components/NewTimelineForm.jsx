import React from 'react';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';
import '../styles/Forms.css';


function NewTimelineForm() {
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
        // Reset form fields after successful submission
        title.reset();
        description.reset();
        coverImage.reset();
      } else {
        console.error('Failed to submit form');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <form onSubmit={handleNewTimelineSubmit}>
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

      <button type="submit">Submit</button>
    </form>
  )
};

export default NewTimelineForm;