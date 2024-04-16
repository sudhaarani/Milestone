
import React,{useState} from 'react';

import '../styles/MilestoneEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import useTextInput from '../hooks/useTextInput';

const MilestoneEditModal = ({ state,milestoneEditToggle }) => {
  const { selectedMilestone } = state;
  //console.log("selectedMilestone:", selectedMilestone);
  const isoDate = new Date(selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
 
  const title = useTextInput(selectedMilestone.milestone_title);
  const date = useTextInput(formattedDate);
  const diary_entry = useTextInput(selectedMilestone.diary_entry);
  
  const [imageInput, setImageInput] = useState([selectedMilestone.image1,selectedMilestone.image2,selectedMilestone.image3,selectedMilestone.image4]);
  const handleMultiEditImageInput = (event) => {
    const uploadedFiles = event.target.files;
    const updatedImages = [];
    for (let i = 0; i < 4; i++) {
      // If there's an uploaded file for this index, use it; otherwise, keep the existing image
      updatedImages.push(uploadedFiles[i]|| imageInput[i]);
    }
    setImageInput(updatedImages);
  };

  //to close the modal once save btn is clicked and form has submitted(form has to be
  //submitted before it closes so delaying one sec)
  const handleSaveClose = () => {
    setTimeout(() => {
      milestoneEditToggle.handleToggle();
    }, 1000); // Delay of 1 second (1000 milliseconds)
  };

  const handleTimelineSave = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title.textInput);  
    formData.append('date', date.textInput);
    formData.append('diary_entry', diary_entry.textInput);
    for (let i = 0; i < imageInput.length; i++) {
      formData.append(`images`, imageInput[i].name || imageInput[i]); //only uploaded files have name(obj),for remaining imageInput[i], its string
    }
    formData.append('milestone_id', selectedMilestone.milestone_id);
    formData.append('timeline_id', selectedMilestone.id);//this is timeline's id

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
  return (
    <div className='milestone-edit-modal'>
      <button className="close-button" onClick={() => { milestoneEditToggle.handleToggle() }} >
        <img src={closeSymbol} alt='close symbol' />
      </button>
      
      {selectedMilestone &&
        (<div>
          <form onSubmit={handleTimelineSave}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" id="title" value={title.textInput} onChange={title.handleTextInput} />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" id="date" value={date.textInput} onChange={date.handleTextInput} />
            </div>
            <div>
              <label>Diary Entry:</label>
              <input type="text" name="diary_entry" id="diary_entry" value={diary_entry.textInput} onChange={diary_entry.handleTextInput}/>
            </div>
            <div>
              <label>Images:</label>
              {selectedMilestone.image1 &&
                <img src={selectedMilestone.milestoneImageUrl[0]} className='card-img-top' alt={selectedMilestone.image1} />}
              {selectedMilestone.image2 &&
                <img src={selectedMilestone.milestoneImageUrl[1]} className='card-img-top' alt={selectedMilestone.image2} />}
              {selectedMilestone.image3 &&
                <img src={selectedMilestone.milestoneImageUrl[2]} className='card-img-top' alt={selectedMilestone.image3} />}
              {selectedMilestone.image4 &&
                <img src={selectedMilestone.milestoneImageUrl[3]} className='card-img-top' alt={selectedMilestone.image4} />}
              <div>
                <input type="file" name="images" id="images" onChange={handleMultiEditImageInput} multiple />
              </div>
            </div>
            <button type="submit" onClick={() => { handleSaveClose() }}>Save</button>
          </form>
        </div>)}
      
    </div>
  )
};

export default MilestoneEditModal;
