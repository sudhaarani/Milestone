
import React,{useState,useEffect} from 'react';

import '../styles/MilestoneEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import useImageInput from '../hooks/useImageInput';
import useTextInput from '../hooks/useTextInput';

const MilestoneEditModal = ({ state,milestoneEditToggle }) => {
  const { selectedMilestone } = state;
  console.log("selectedMilestone:", selectedMilestone);
  const isoDate = new Date(selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
 
  const title = useTextInput(selectedMilestone.milestone_title);
  const date = useTextInput(formattedDate);
  const diary_entry = useTextInput(selectedMilestone.diary_entry);
  const images = useImageInput([selectedMilestone.image1,selectedMilestone.image2,selectedMilestone.image3,selectedMilestone.image4]);

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
    for (let i = 0; i < images.imageInput.length; i++) {
      console.log("images.imageInput i:", images.imageInput[i]);
      console.log("images.imageInput i:", images.imageInput[i].name);
      formData.append(`images`, images.imageInput[i].name || images.imageInput[i]);
    }
    console.log("images.imageInput:", images.imageInput);
    console.log("milestone_id:", selectedMilestone.milestone_id);
    console.log("timeline.id:", selectedMilestone.id);
    console.log("images:", selectedMilestone.milestoneImageUrl);
    //console.log("images:", selectedMilestone.milestoneImageUrl);
    formData.append('milestone_id', selectedMilestone.milestone_id);
    formData.append('timeline_id', selectedMilestone.id);//this is timeline's id
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
              <img src={selectedMilestone.milestoneImageUrl[0]} className='card-img-top' alt={selectedMilestone.image1} />
              <img src={selectedMilestone.milestoneImageUrl[1]} className='card-img-top' alt={selectedMilestone.image2} />
              <img src={selectedMilestone.milestoneImageUrl[2]} className='card-img-top' alt={selectedMilestone.image3} />
              <img src={selectedMilestone.milestoneImageUrl[3]} className='card-img-top' alt={selectedMilestone.image4} />
              <div>
              <input type="file" name="images" id="images" onChange={() => {
                images.handleMultiEditImageInput(images.imageInput)
              } } multiple />
              </div>
            </div>
            <button type="submit" onClick={() => { handleSaveClose() }}>Save</button>
          </form>
        </div>)}
      
    </div>
  )
};

export default MilestoneEditModal;
