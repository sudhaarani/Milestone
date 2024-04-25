import React from 'react';
import ListOfTimelines from "./ListOfTimelines";

const MyTimelines = ({state, timelineToggle, handleSelectedTimeline, handleFavourites, isLoggedIn,
  getMilestonesByTimeline, getTimelinesOf1User, handleFollowedUsers, userId }) => {

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
        handleFollowedUsers={handleFollowedUsers}
        userId={userId}
      />
    </div>
  );
}

export default MyTimelines;