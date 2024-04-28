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