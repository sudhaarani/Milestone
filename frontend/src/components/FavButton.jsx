import React from 'react';

import FavIcon from './FavIcon';
//import '../styles/FavButton.scss';

function FavButton({handleFavorites, state, id }) {

  return (
    <div className="photo-list__fav-icon" onClick={() => {
      handleFavorites(id)
    }}>
      <div className="photo-list__fav-icon-svg">
        {/* Insert React */}
        <FavIcon selected={state.favTimelines.includes(id)} />
      </div>
    </div>
  );
}

export default FavButton;