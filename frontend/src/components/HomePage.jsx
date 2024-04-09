import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({state, handleToggle, handleSelectedTimeline,handleFavorite,favoritesState}) => {
  return (
    <div>
      <ListOfTimelines state={state} handleToggle={handleToggle} handleSelectedTimeline={handleSelectedTimeline}
        handleFavorite={handleFavorite} favoritesState={favoritesState} />
    </div>
  );
}

export default HomePage;
