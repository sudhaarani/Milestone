import React from 'react';

import ListOfTimelines from "./ListOfTimelines";

const HomePage = ({state,setDisplayModal,handleModalTimeline}) => {
  return (
    <div>
      <ListOfTimelines state={state} setDisplayModal={setDisplayModal} handleModalTimeline={handleModalTimeline} />
    </div>
  );
}

export default HomePage;
