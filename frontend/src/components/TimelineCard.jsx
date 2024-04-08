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
        <button type="button" className="btn btn-primary" onClick={() => { 
          handleToggle() 
          handleSelectedTimeline(id)
        }}> Edit </button>
        <button type="button" className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default TimelineCard;