import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ListOfTimelines from "./ListOfTimelines";

const MyTimelines = ({ handleToggle, handleSelectedTimeline, handleFavourites }) => {
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
      {/* <ListOfTimelines 
        state={state}
        handleToggle={handleToggle}
        handleSelectedTimeline={handleSelectedTimeline}
        handleFavourites={handleFavourites}
      /> */}
    </div>
  );
}

export default MyTimelines;