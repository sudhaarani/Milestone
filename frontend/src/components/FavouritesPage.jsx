import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const FavouritesPage = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites, getMilestonesByTimeline, getTimelinesOf1User }) => {
  return (
    <div>
      <ListOfTimelines 
        state={state}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        isLoggedIn={isLoggedIn}
        getMilestonesByTimeline={getMilestonesByTimeline}
        getTimelinesOf1User={getTimelinesOf1User}
      />
    </div>
  );
}

export default FavouritesPage;