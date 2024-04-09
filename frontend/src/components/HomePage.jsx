import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({state, handleToggle, handleSelectedTimeline}) => {
  return (
    <div>
      <ListOfTimelines state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline} />
    </div>
  );
}

export default HomePage;
