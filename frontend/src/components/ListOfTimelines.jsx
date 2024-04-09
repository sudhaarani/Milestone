import React from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css'

const ListOfTimelines = ({ state, handleToggle, handleSelectedTimeline, handleFavourites }) => {
  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard 
              key={timelineList.id}
              timelineList={timelineList}
              handleToggle={handleToggle}
              handleSelectedTimeline={handleSelectedTimeline}
              state={state}
              handleFavourites={handleFavourites}
            />)
  });

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;
