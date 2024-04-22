
//if 2 available, displays image and edit button, add 2 more pen
import React, { useState, useEffect } from 'react';

import '../styles/MilestoneEditModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
const MilestoneEditModal = ({ state,milestoneEditToggle }) => {
  const { selectedMilestone } = state;
  console.log("selectedMilestone:", selectedMilestone);
  const isoDate = new Date(selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD
 

  const oldValuesFromDatabase = {
    title: selectedMilestone.milestone_title,
    date: formattedDate,
    diary_entry: selectedMilestone.diary_entry,
    image1:selectedMilestone.image1, //`/uploads/`
    image2:selectedMilestone.image2,
    image3:selectedMilestone.image3,
    image4:selectedMilestone.image4,
  };
  const [oldValues, setOldValues] = useState(oldValuesFromDatabase);
  const [editedValues, setEditedValues] = useState(oldValuesFromDatabase);
  const [imagesNotNullInDbCount, setImagesNotNullInDbCount] = useState(selectedMilestone.milestoneImageUrl.length);// to change the count of Add button based on deletion
  const [imageError, setImageError] = useState('');
  console.log("imagesNotNullInDbCount in component:", imagesNotNullInDbCount);
  console.log("editedValues in component:", editedValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };
  let fieldArray = [];
  const checkNull = () => {
    Object.entries(editedValues).slice(3, 7).map(([key, value], index) => {
      if (value === null) { //"/uploads/
        fieldArray.push(key);
      }
    })
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image1' || 'image2' || 'image3' || 'image4') {
      console.log("name::files::", name, ",", files[0]);
      const imageFile = files[0];
      setEditedValues({ ...editedValues, [name]: imageFile });
      //console.log("imageFile:", imageFile);
    }
    console.log("e.target:", e.target);
    if (name === 'images') {
      console.log("inside images(multiple) e.target.files:", files);
      const lenOfTargetFiles = files.length;
      checkNull();
      console.log("fieldArray:", fieldArray);
      console.log("imagesNotNullInDbCount:", imagesNotNullInDbCount);
      console.log("lenOfTargetFiles:", lenOfTargetFiles);
      if (lenOfTargetFiles > (4-imagesNotNullInDbCount)) {
        setImageError(`Maximum of ${4-imagesNotNullInDbCount} image(s) allowed.`);
        return;
      }
      if (lenOfTargetFiles === 4) {
        console.log("inside if 4");
        setEditedValues({
          ...editedValues, [fieldArray[0]]: files[0], [fieldArray[1]]: files[1],
          [fieldArray[2]]: files[2], [fieldArray[3]]:files[3]
        });
        setImagesNotNullInDbCount(imagesNotNullInDbCount+lenOfTargetFiles);
      }
      if (lenOfTargetFiles === 3) {
        console.log("inside if 3");
        setEditedValues({
          ...editedValues, [fieldArray[0]]: files[0],
          [fieldArray[1]]: files[1], [fieldArray[2]]: files[2]
        });
        setImagesNotNullInDbCount(imagesNotNullInDbCount+lenOfTargetFiles);
      }
      if (lenOfTargetFiles === 2) {
        console.log("inside if 2");
        setEditedValues({
          ...editedValues, [fieldArray[0]]: files[0], [fieldArray[1]]: files[1]
        });
        setImagesNotNullInDbCount(imagesNotNullInDbCount+lenOfTargetFiles);
      }
      if (lenOfTargetFiles === 1) {
        console.log("inside if 1");
        setEditedValues({
          ...editedValues, [fieldArray[0]]: files[0]
        });
        setImagesNotNullInDbCount(imagesNotNullInDbCount+lenOfTargetFiles);
      }
    }
  };
 
  const handleImageDelete = (ColName,imageName) => { 
    //ColName, imageName
    console.log("milestone_id:", selectedMilestone.milestone_id);
    console.log("ColName:", ColName);
    console.log("imageName:", imageName);
    fetch(`/api/milestones/delete-image/${selectedMilestone.milestone_id}/${ColName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageName })
    })
    .then(response => {
      if (response.ok) {
        console.log("Deleted Milestone-image successfully");
        setEditedValues({
          ...editedValues, [ColName]: null
        });
        setImagesNotNullInDbCount(imagesNotNullInDbCount - 1);
       // console.log("imagesNotNullInDbCount: after image deletion::", imagesNotNullInDbCount);
      } else {
        console.error('Failed to Delete Milestone');
      }
    })
    .catch((error) => {
      console.error('Error deleting Milestone:', error);
    });
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
    console.log("inside handleTimelineSave:");
    const formData = new FormData();
    console.log("editedValues:", editedValues);
    console.log("oldValues:", oldValues);

    Object.keys(editedValues).forEach(fieldName => {
      const file = oldValues[fieldName] === editedValues[fieldName] ? '' :editedValues[fieldName];
      if (file) {
        console.log("fieldName:", fieldName);
        console.log("file:", file);
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
                 value &&  //value !== '/uploads/null' &&
                  (<div>
                    <label for={key}>
                      <i className="fa-solid fa-pen" />
                    </label>
                    <i className="fa-solid fa-trash" onClick={()=>{handleImageDelete(key,value)}}/>
                    <input type="file" name={key} id={key} onChange={handleImageChange} style={{ display: 'none' }} />
                    <img src={`/uploads/${value}`} className='card-img-top' alt={value.name} />
                  </div>)
                  ))}
            <div>
            <div>
                {imagesNotNullInDbCount <= 3 &&
                  <div>
                    <label htmlFor="images" className={`btn btn-primary`}>
                      {`Add (Max of ${4 - imagesNotNullInDbCount})`}
                    </label>
                    {imageError && <p style={{ color:'red' }}> {imageError} </p>}
                  </div>
                }
            </div>
                <div>
                  <input type="file" name="images" id="images" onChange={handleImageChange} multiple style={{ display: 'none' }} />
                </div>
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
