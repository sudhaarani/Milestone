import React from 'react';

import FavIcon from './FavIcon';
//import '../styles/FavButton.scss';

function FavButton({handleFavorite, favoritesState, id }) {

  return (
    <div className="photo-list__fav-icon" onClick={() => {
      handleFavorite(id)
    }}>
      <div className="photo-list__fav-icon-svg">
        {/* Insert React */}
        <FavIcon selected={favoritesState.includes(id)} />
      </div>
    </div>
  );
}

export default FavButton;