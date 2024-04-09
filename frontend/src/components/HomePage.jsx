import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({state, handleToggle, handleSelectedTimeline,handleFavorites}) => {
  return (
    <div>
      <ListOfTimelines state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavorites={handleFavorites} />
    </div>
  );
}

export default HomePage;
