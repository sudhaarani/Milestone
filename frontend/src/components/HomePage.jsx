import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({ state, timelineToggle, handleSelectedTimeline, handleFavourites,
  getMilestonesByTimeline,timelineEditToggle,handleDeleteTimeline,isLoggedIn,getTimelinesOf1User, handleFollowedUsers, userId }) => {
    
  return (
    <div>
      <ListOfTimelines
        state={state}
        isLoggedIn={isLoggedIn}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
        getTimelinesOf1User={getTimelinesOf1User}
        timelineEditToggle={timelineEditToggle}
        handleDeleteTimeline={handleDeleteTimeline}
        handleFollowedUsers={handleFollowedUsers}
        userId={userId}
      />
    </div>
  );
}

export default HomePage;
