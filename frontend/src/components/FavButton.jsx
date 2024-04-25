// import React from 'react';

// import FavIcon from './FavIcon';
// //import '../styles/FavButton.scss';  

// function FavButton({ handleFavourites, state, id }) {

//   return (
//     <div className="photo-list__fav-icon" onClick={() => {
//       handleFavourites(id)
//     }}>
//       <div className="photo-list__fav-icon-svg">
//         <FavIcon selected={state.favTimelines.includes(id)} />
//       </div>
//     </div>
//   );
// }

// export default FavButton;


/////////////Reason for updating code//////////////////////
// In this code, I've replaced state.favTimelines.includes(id) with state && state.favTimelines ? state.favTimelines.includes(id) : false. This checks if state and state.favTimelines are defined before calling includes. If they're not defined, it passes false to FavIcon.

import React from 'react';
import FavIcon from './FavIcon';

function FavButton({ handleFavourites, state, timelineId, userId }) {

  return (
    <div className="photo-list__fav-icon" onClick={() => {
      handleFavourites(timelineId, userId)
    }}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={state && state.favTimelines ? state.favTimelines.includes(timelineId) : false} />
      </div>
    </div>
  );
}

export default FavButton;