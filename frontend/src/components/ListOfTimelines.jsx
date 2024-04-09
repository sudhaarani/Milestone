import React from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css'

const ListOfTimelines = ({state, handleToggle, handleSelectedTimeline,handleFavorites}) => {
  console.log(state.timelines)

  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard 
                key={timelineList.id}
                timelineList={timelineList}
                handleToggle={handleToggle}
                handleSelectedTimeline={handleSelectedTimeline}
                state={state}
                handleFavorites={handleFavorites}
                />
            </div>)
  });

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;
