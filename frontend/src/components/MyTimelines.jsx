import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ListOfTimelines from "./ListOfTimelines";

const MyTimelines = ({state, timelineToggle, handleSelectedTimeline, handleFavourites, isLoggedIn,
  getMilestonesByTimeline, getTimelinesOf1User,timelineEditToggle,handleDeleteTimeline, handleFollowedUsers, userId }) => {
  
  // const [state, setState] = useState({ timelines: [] });
  // const { id: userId } = useParams();
  // useEffect(() => {
  //   fetch(`http://localhost:8001/api/timelines/${userId}`)
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log("DATA ",data)
  //       setState({ timelines: data })
  //     })
  //     .catch(error => console.error('Error:', error));
  // }, [userId]);

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
        timelineEditToggle={timelineEditToggle}
        handleDeleteTimeline={handleDeleteTimeline}
        handleFollowedUsers={handleFollowedUsers}
        userId={userId}
      />
    </div>
  );
}

export default MyTimelines;