import React from 'react';

import TimelineCard from "./TimelineCard";

const ListOfTimelines = ({state, handleToggle, handleSelectedTimeline}) => {

  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard 
            key={timelineList.id}
            timelineList={timelineList}
            handleToggle={handleToggle}
            handleSelectedTimeline={handleSelectedTimeline}
            state={state}
            />)
  });

  return (
    <ul>
      {TimelineListArray}
    </ul>
  );
};

export default ListOfTimelines;
