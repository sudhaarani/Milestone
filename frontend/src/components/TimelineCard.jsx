import React from 'react';
import '../styles/TimelineCard.css'
import FavButton from "./FavButton";

const TimelineCard = ({isLoggedIn, timelineList, timelineToggle, handleSelectedTimeline, handleFavourites,
  state, getMilestonesByTimeline,timelineEditToggle,handleDeleteTimeline,getTimelinesOf1User }) => {
  const { id, user_id, username, title, description, timelineImageUrl } = timelineList;

  return (
    <div className='card'>
      <img src={timelineImageUrl} className='card-img-top' alt={title} onClick={() => { 
              timelineToggle.handleToggle()
              handleSelectedTimeline(id)
              getMilestonesByTimeline(id)
            }} 
      />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div>
      <div className='card-footer'>
        <div className='card-username' onClick={() => {getTimelinesOf1User(user_id)}}>
          By <p>{username}</p>
        </div>
        <i className='fa-solid fa-trash'
          onClick={() => { 
            handleDeleteTimeline(id)
          }}
        />
        {isLoggedIn && <FavButton id={id} handleFavourites={handleFavourites} state={state} />}
      </div>
    </div>
  );
}

export default TimelineCard;