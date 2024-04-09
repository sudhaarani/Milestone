import React from 'react';

import FavIcon from './FavIcon';
//import '../styles/FavButton.scss';

function FavButton({ handleFavourites, state, id }) {

  return (
    <div className="photo-list__fav-icon" onClick={() => {
      handleFavourites(id)
    }}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={state.favTimelines.includes(id)} />
      </div>
    </div>
  );
}

export default FavButton;