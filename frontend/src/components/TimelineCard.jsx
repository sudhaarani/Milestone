import React from 'react';
import '../styles/TimelineCard.css'
import FavButton from "./FavButton";

const TimelineCard = ({ timelineList, timelineToggle, handleSelectedTimeline, handleFavourites,
  state, getMilestonesByTimeline,timelineEditToggle }) => {
  const { id, username, title, description, timelineImageUrl } = timelineList;

  return (
    <div className='card'>
      
      <img src={timelineImageUrl} className='card-img-top' alt={title} onClick={() => { 
            timelineToggle.handleToggle() 
            handleSelectedTimeline(id)
            getMilestonesByTimeline(id)
          }} />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div>
      <div className='card-footer'>
        <p className='card-username'>By {username}</p>
        <i className='fa-solid fa-pen' 
          onClick={() => { 
            timelineEditToggle.handleToggle() 
            handleSelectedTimeline(id)
            getMilestonesByTimeline(id)
          }} 
        />
        <i className='fa-solid fa-trash'></i>
        <FavButton id={id} handleFavourites={handleFavourites} state={state} />
      </div>

    </div>
  );
}

export default TimelineCard;

