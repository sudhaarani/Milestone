import React from 'react';

import TimelineCard from "./TimelineCard";

const ListOfTimelines = ({state,setDisplayModal,handleModalTimeline}) => {
 
  console.log("ListOfTimelines timelines:",state.timelines);
  const TimelineListArray = state.timelines.map((timelineList) => {
    return (<TimelineCard key={timelineList.id}
      timelineList={timelineList}
      setDisplayModal={setDisplayModal}
      handleModalTimeline={handleModalTimeline}
      state={state}
    />)
  }
  );

  return (
    <ul>
      {/* Insert React */}
      {TimelineListArray}
    </ul>
  );
};

export default ListOfTimelines;
