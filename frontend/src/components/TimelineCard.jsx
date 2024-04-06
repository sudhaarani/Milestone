import React from 'react';

const TimelineCard = ({ timelineList,setDisplayModal,handleModalTimeline ,state}) => {
  const { id, title, description } = timelineList;
  console.log("TimelineCard : title",title);
  return (
    <div>
        <p>{title}</p>
        <p>{description}</p>
        <button type="submit" onClick={() => {
          setDisplayModal()
          handleModalTimeline(id)
        }}>Edit</button>
      <button >Delete</button>
    </div>
  );
}

export default TimelineCard;