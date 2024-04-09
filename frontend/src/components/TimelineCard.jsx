import React from 'react';
import '../styles/TimelineCard.css'
import FavButton from "./FavButton";

const TimelineCard = ({ timelineList, handleToggle, handleSelectedTimeline,handleFavorite,favoritesState}) => {
  const { id, title, description, timelineImageUrl } = timelineList;

  return (
    <div className="card">
      {/* can add this favbutton whereever we needed once the flow is created */}
      <FavButton id={id} favoritesState={favoritesState} handleFavorite={handleFavorite} />
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