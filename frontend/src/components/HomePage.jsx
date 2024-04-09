import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, handleToggle, handleSelectedTimeline, handleFavourites }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        handleToggle={handleToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
      />
    </div>
  );
}

export default HomePage;
