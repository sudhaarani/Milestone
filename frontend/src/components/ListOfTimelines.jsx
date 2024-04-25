import React from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css';

const ListOfTimelines = ({ state, isLoggedIn, timelineToggle, handleSelectedTimeline, handleFavourites,
  getMilestonesByTimeline, getTimelinesOf1User, handleFollowedUsers, userId }) => {
    
  let TimelineListArray;

  if (state.timelines.length === 0 && (state.favTimelines.length === 0 || state.followedUsers.length === 0)) {
    TimelineListArray = (
      <div className="listoftimelines-default-msg-container">
        <h1> <i class="fa-regular fa-folder-open" /> Nothing to see here — yet </h1>
      </div>
    );
  } else {
    TimelineListArray = state.timelines.map((timelineList) => (
      <TimelineCard 
        key={timelineList.id}
        timelineList={timelineList}
        timelineToggle={timelineToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        state={state}
        isLoggedIn={isLoggedIn}
        handleFavourites={handleFavourites}
        getMilestonesByTimeline={getMilestonesByTimeline}
        getTimelinesOf1User={getTimelinesOf1User} // Pass the function as a prop
        handleFollowedUsers={handleFollowedUsers}
        userId={userId}
      />
    ));
  }

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;