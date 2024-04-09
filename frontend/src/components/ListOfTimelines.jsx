import React from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css'

const ListOfTimelines = ({state, handleToggle, handleSelectedTimeline}) => {
  console.log(state.timelines)

  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard 
                timelineList={timelineList}
                handleToggle={handleToggle}
                handleSelectedTimeline={handleSelectedTimeline}
                state={state}
            />)
  });

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;
