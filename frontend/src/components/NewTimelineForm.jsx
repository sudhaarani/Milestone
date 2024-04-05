import React, { useState } from 'react';

function NewTimelineForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleTitle = (event) => {
    setTitle(event.target.value); // selects the value inputted into textfield
  };

  const handleDescription = (event) => {
    setDescription(event.target.value); 
  };

  const handleCoverImage = (event) => {
    setCoverImage(event.target.files[0]) // selects the image
  }

  const handleNewTimelineSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('coverimage', coverImage);

    fetch('/api/timelines', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Submitted Timeline Form")
        // Reset form fields after successful submission
        setTitle('');
        setDescription('');
        setCoverImage(null);
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
        <input type="text" id="title" value={title} onChange={handleTitle} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" id="description" value={description} onChange={handleDescription} />
      </div>

      <div>
        <input type="file" id="cover_image" onChange={handleCoverImage} />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
};

export default NewTimelineForm;