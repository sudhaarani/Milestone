import React from 'react';

const TimelineCard = ({ timelineList, handleToggle, handleSelectedTimeline, state}) => {
  const { id, title, description } = timelineList;

  return (
    <div>
        <p>{title}</p>
        <p>{description}</p>

        <button type="submit" onClick={() => { 
            handleToggle() 
            handleSelectedTimeline(id)
          }}> Edit </button>
        <button>Delete</button>

    </div>
  );
}

export default TimelineCard;