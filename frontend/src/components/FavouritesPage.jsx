import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const FavouritesPage = ({ state, isLoggedIn, handleToggle, handleSelectedTimeline, handleFavourites }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        handleToggle={handleToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default FavouritesPage;