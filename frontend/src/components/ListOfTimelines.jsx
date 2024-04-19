import React from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css'

const ListOfTimelines = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline, getTimelinesOf1User }) => {

  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard 
              key={timelineList.id}
              username={timelineList.username}
              timelineList={timelineList}
              timelineToggle={timelineToggle}
              handleSelectedTimeline={handleSelectedTimeline}
              state={state}
              isLoggedIn={isLoggedIn}
              handleFavourites={handleFavourites}
              getMilestonesByTimeline={getMilestonesByTimeline}
              getTimelinesOf1User={getTimelinesOf1User} // Pass the function as a prop
            />)
  });

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;