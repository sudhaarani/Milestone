import React from 'react';
import '../styles/TimelineCard.css'

const TimelineCard = ({ timelineList, handleToggle, handleSelectedTimeline, state}) => {
  const { id, title, description, timelineImageUrl } = timelineList;

  return (
    <div className="card">
      <img src={timelineImageUrl} className="card-img-top" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer">
        <p className="card-username">By insert_username</p>
        <i class="fa-solid fa-pen" 
          onClick={() => { 
            handleToggle() 
            handleSelectedTimeline(id)
          }} 
        />
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}

export default TimelineCard;

