
//if 2 available, displays image and edit button, add 2 more pen
import React, { useState, useEffect } from 'react';

import '../styles/MilestoneEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
const MilestoneEditModal = ({ state,milestoneEditToggle }) => {
  const { selectedMilestone } = state;
  console.log("selectedMilestone:", selectedMilestone);
  const isoDate = new Date(selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
  const imagesNotNullInDbCount = selectedMilestone.milestoneImageUrl.length; 
  console.log("imagesNotNullInDbCount:", imagesNotNullInDbCount);
  
  const oldValuesFromDatabase = {
    title: selectedMilestone.milestone_title,
    date: formattedDate,
    diary_entry: selectedMilestone.diary_entry,
    image1:selectedMilestone.milestoneImageUrl[0],
    image2:selectedMilestone.milestoneImageUrl[1],
    image3:selectedMilestone.milestoneImageUrl[2],
    image4:selectedMilestone.milestoneImageUrl[3],
  };
  const [oldValues, setOldValues] = useState(oldValuesFromDatabase);
  const [editedValues, setEditedValues] = useState(oldValuesFromDatabase);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image1' || 'image2' || 'image3' || 'image4') {
      const imageFile = files[0];
      setEditedValues({ ...editedValues, [name]: imageFile });
      console.log("imageFile:", imageFile);
    }
    console.log("e.target:", e.target);
    if (name === 'images') {
      console.log("inside images(multiple) e.target.files:", files);
      const lenOfTargetFiles = files.length;
      console.log("lenOfTargetFiles:", lenOfTargetFiles);
      if (lenOfTargetFiles === 4) {
        setEditedValues({
          ...editedValues, image1: files[0], image2: files[1],
          image3: files[2], image4:files[3]
        });
      }
      if (lenOfTargetFiles === 3) {
        setEditedValues({
          ...editedValues, image2: files[0],
          image3: files[1], image4: files[2]
        });
      }
      if (lenOfTargetFiles === 2) {
        setEditedValues({
          ...editedValues, image3: files[0], image4: files[1]
        });
      }
      if (lenOfTargetFiles === 1) {
        setEditedValues({
          ...editedValues, image4: files[0]
        });
      }
    }
  };
    // if (imageFile) {
    //   // File/Blob object is present
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //       setEditedValues({ ...editedValues, [name]: reader.result });
    //   }
    //   reader.readAsDataURL(imageFile);
    //   console.log("reader.result :", reader.result );
    // }else {
    // setEditedValues({ ...editedValues, [name]: imageFile });
    // }
    // const reader = new FileReader();
    
    // reader.onloadend = () => {
    //   setEditedValues({ ...editedValues, [name]: reader.result });
    // }
    // if (firstFile) {
    //   reader.readAsDataURL(firstFile);
    // }
  

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
    console.log("editedValues:", editedValues);
    console.log("oldValues:", oldValues);

    Object.keys(editedValues).forEach(fieldName => {
      const file = oldValues[fieldName] === editedValues[fieldName] ? '' :editedValues[fieldName];
      if (file) {
        formData.append(fieldName, file);
      }
    });
    formData.append('milestone_id', selectedMilestone.milestone_id);
    formData.append('timeline_id', selectedMilestone.id);//this is timeline's id
    
    fetch('/api/milestones/update', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Saved Milestone Edit Form");
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
          <form onSubmit={handleTimelineSave} enctype="multipart/form-data">
            <div>
              <label>Title:</label>
              <input type="text" name="title" id="title" value={editedValues.title} onChange={handleChange} />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" id="date" value={editedValues.date} onChange={handleChange} />
            </div>
            <div>
              <label>Diary Entry:</label>
              <input type="text" name="diary_entry" id="diary_entry" value={editedValues.diary_entry} onChange={handleChange}/>
            </div>
            <div>
              <label>Images:</label>
              {Object.entries(editedValues).slice(3, 7).map(([key, value], index) => (  
                value &&  value !== '/uploads/null' &&
                  (<div>
                    <label for={key}>
                      <i className="fa-solid fa-pen" />
                    </label>
                    <input type="file" name={key} id={key} onChange={handleImageChange} style={{ display: 'none' }} />
                    <img src={value} className='card-img-top' alt={value.name} />
                  </div>)
                  ))}
              <div>
                <label for="images" class="btn btn-primary">
                {imagesNotNullInDbCount === 0 ? 'Add (Max of 4)' :
                  imagesNotNullInDbCount === 1 ? 'Add (Max of 3)' :
                  imagesNotNullInDbCount === 2 ? 'Add (Max of 2)' :
                  imagesNotNullInDbCount === 3 ? 'Add (Max of 1)' : ""}
                </label>
                <input type="file" name="images" id="images" onChange={handleImageChange} multiple style={{ display: 'none' }} />
              </div>
            </div>
            <button type="submit" onClick={() => { handleSaveClose() }}>Save</button>
          </form>
        </div>)
      }  
    </div>
  )
};

export default MilestoneEditModal;
