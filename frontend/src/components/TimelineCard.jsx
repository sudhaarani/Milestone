import React from 'react';
import '../styles/TimelineCard.css'

const TimelineCard = ({ timelineList, handleToggle, handleSelectedTimeline, state}) => {
  const { id, title, description, timelineImageUrl } = timelineList;

  return (
    <div className='card' key={timelineList.id}>
      <img src={timelineImageUrl} className='card-img-top' alt={title} />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div>
      <div className='card-footer'>
        <p className='card-username'>By insert_username</p>
        <i className='fa-solid fa-pen' 
          onClick={() => { 
            handleToggle() 
            handleSelectedTimeline(id)
          }} 
        />
        <i className='fa-solid fa-trash'></i>
      </div>
    </div>
  );
}

export default TimelineCard;

