import React from 'react';
import '../styles/TimelineCard.css'
import FavButton from "./FavButton";

const TimelineCard = ({ timelineList, handleToggle, handleSelectedTimeline,handleFavorites,state}) => {
  const { id, username, title, description, timelineImageUrl } = timelineList;

  return (
    <div className='card'>
      {/* can add this favbutton whereever we needed once the flow is created */}
      <FavButton id={id} handleFavorites={handleFavorites} state={state} />
      
      <img src={timelineImageUrl} className='card-img-top' alt={title} />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div>
      <div className='card-footer'>
        <p className='card-username'>By {username}</p>
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

