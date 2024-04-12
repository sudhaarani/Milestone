import React from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css'

const ListOfTimelines = ({ state, timelineToggle, handleSelectedTimeline, handleFavourites,getMilestonesByTimeline }) => {
  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard 
              key={timelineList.id}
              timelineList={timelineList}
              timelineToggle={timelineToggle}
              handleSelectedTimeline={handleSelectedTimeline}
              state={state}
              handleFavourites={handleFavourites}
              getMilestonesByTimeline={getMilestonesByTimeline}
            />)
  });

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;
