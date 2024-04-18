import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, isLoggedIn, handleToggle, handleSelectedTimeline, handleFavourites }) => {
  return (
    <div>
      <ListOfTimelines
        state={state}
        isLoggedIn={isLoggedIn}
        handleToggle={handleToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
      />
    </div>
  );
}

export default HomePage;
