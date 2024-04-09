import { useState } from "react";

const useToggle = (initialState = false) => {
  const [toggleState, setToggleState] = useState(initialState);
  const [favoritesState, setFavoritesState] = useState([]);


  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const handleFavorite = (id) => {
    //console.log("handleFavorite :: id:", id);
    setFavoritesState(favPhotos => {
      //console.log(favPhotos.includes(id));
      if (favPhotos.includes(id)) {
        // If yes, remove it from the favorite list
        return favPhotos.filter(_id => _id !== id);
      } else {
        // If not, add it to the favorite list
        return [...favPhotos, id];
      }
    })
  }

  return { toggleState,favoritesState, handleToggle, handleFavorite};
}

export default useToggle;