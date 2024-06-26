//if 2 available, displays image and edit button, add 2 more pen
import React, { useState } from 'react';
import '../styles/MilestoneEditModal.css';

const MilestoneEditModal = ({ state, milestoneEditToggle, timelineEditToggle, handleSelectedTimeline, getMilestonesByTimeline }) => {

  const { selectedMilestone } = state;

  const isoDate = new Date(selectedMilestone.milestone_date).toISOString();
  const formattedDate = isoDate.substring(0, 10); // Extracting YYYY-MM-DD

  const oldValuesFromDatabase = {
    title: selectedMilestone.milestone_title,
    date: formattedDate,
    diary_entry: selectedMilestone.diary_entry,
    image1:selectedMilestone.image1, 
    image2:selectedMilestone.image2,
    image3:selectedMilestone.image3,
    image4:selectedMilestone.image4,
  };
  const [oldValues, setOldValues] = useState(oldValuesFromDatabase);
  const [editedValues, setEditedValues] = useState(oldValuesFromDatabase);

  const [imagesNotNullInDbCount, setImagesNotNullInDbCount] = useState(selectedMilestone.milestoneImageUrl.length);// to change the count of Add button based on deletion
  const [imageError, setImageError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };
  let fieldArray = [];
  const checkNull = () => {
    Object.entries(editedValues).slice(3, 7).map(([key, value], index) => {
      if (value === null) { 
        fieldArray.push(key);
      }
    })
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image1' || name ==='image2' || name ==='image3' || name ==='image4') {
      const imageFile = files[0];
      setEditedValues({ ...editedValues, [name]: imageFile });
    }
  
    if (name === 'images') {
      const lenOfTargetFiles = files.length;
      checkNull();

      if (lenOfTargetFiles > (4-imagesNotNullInDbCount)) {
        setImageError(`Maximum of ${4-imagesNotNullInDbCount} image(s) allowed.`);
        return;
      }
      const updatedValues = {};
      for (let i = 0; i < lenOfTargetFiles; i++) {
        updatedValues[fieldArray[i]] = files[i];
      }
      setEditedValues({
        ...editedValues,
        ...updatedValues
      });
      setImagesNotNullInDbCount(imagesNotNullInDbCount + lenOfTargetFiles);
    }
  };
 
  const handleImageDelete = (ColName,imageName) => { 
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
      } else {
        console.error('Failed to Delete Milestone');
      }
    })
    .catch((error) => {
      console.error('Error deleting Milestone:', error);
    });
  };

  const handleTimelineSave = (event) => {
    event.preventDefault();
    const formData = new FormData();

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
    .then(data => {
      // close milestone & timeline edit modals:
      milestoneEditToggle.handleToggle(); 
      timelineEditToggle.handleToggle();
      //update state for timeline and milestones using timeline id (selectedMilestone.id = timeline id)
      handleSelectedTimeline(selectedMilestone.id);
      getMilestonesByTimeline(selectedMilestone.id); 
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div className='milestone-edit-modal'>
      <i className="fa-solid fa-arrow-left" onClick={() => { milestoneEditToggle.handleToggle() }} />

      <h3 className='edit-modal-headers'>Edit Milestone</h3>

      {selectedMilestone &&
        (<div>
          <form className='edit-forms' onSubmit={handleTimelineSave} enctype="multipart/form-data">

            <div className='editmilestone-text-container'>
              <div>
                <div>
                  <label>Title:</label>
                  <input type="text" name="title" id="title" value={editedValues.title} onChange={handleChange} />
                </div>
                <div>
                  <label>Date:</label>
                  <input className='editmilestone-date' type="date" name="date" id="date" value={editedValues.date} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label>Diary Entry:</label>
                <textarea style={{ height:'120px'}} type="text" name="diary_entry" id="diary_entry" value={editedValues.diary_entry} onChange={handleChange}/>
              </div>
            </div>

            <label style={{fontWeight:'bold'}}>Photos</label>

            <div className='editmilestone-photos-container'>
              <div className='editmilestone-photos'>
                {Object.entries(editedValues).slice(3, 7).map(([key, value], index) => ( value &&
                (<div>
                  <input type="file" name={key} id={key} onChange={handleImageChange} className='no-display-file-input' />

                  <img src={`/uploads/${value}`} className='edit-image-preview' alt={value.name} />

                  <div id='editmilestone-image-buttons'>
                    <label for={key}>
                      <i className="fa-solid fa-pen" />
                    </label>
                    <label>
                      <i className="fa-solid fa-trash" onClick={()=>{handleImageDelete(key,value)}}/>
                    </label>
                  </div>
                </div>)))
                }
              </div>

              {imagesNotNullInDbCount <= 3 &&
              (<div>
                <label htmlFor="images" className={`btn btn-outline-secondary btn-sm`}>
                  {`+ New Image (Max of ${4 - imagesNotNullInDbCount})`}
                </label>
                {imageError && <p className='error-message'> {imageError} </p>}

                <input type="file" name="images" id="images" onChange={handleImageChange} className='no-display-file-input' multiple />
              </div>)}

            </div>

            <div className='editmilestone-save'>
              <button className='btn btn-info' type="submit">
                <i class="fa-solid fa-circle-check"/> Save
              </button>
            </div>

          </form>
        </div>)
      }  
    </div>
  )
};
export default MilestoneEditModal;