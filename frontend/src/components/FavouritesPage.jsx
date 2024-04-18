import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const FavouritesPage = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        isLoggedIn={isLoggedIn}
        getMilestonesByTimeline={getMilestonesByTimeline}
      />
    </div>
  );
}

export default FavouritesPage;