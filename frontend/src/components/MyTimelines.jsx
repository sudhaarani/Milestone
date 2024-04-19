import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ListOfTimelines from "./ListOfTimelines";

const MyTimelines = ({ timelineToggle, handleSelectedTimeline, handleFavourites, isLoggedIn, getMilestonesByTimeline, getTimelinesOf1User }) => {
  
  const [state, setState] = useState({ timelines: [] });
  const { id: userId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8001/api/timelines/${userId}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("DATA ",data)
        setState({ timelines: data })
      })
      .catch(error => console.error('Error:', error));
  }, [userId]);

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

export default MyTimelines;