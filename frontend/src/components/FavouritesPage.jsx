import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const FavouritesPage = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default FavouritesPage;