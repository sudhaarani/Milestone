import { useState } from "react";

const useToggle = (initialState = false) => {
  const [toggleState, setToggleState] = useState(initialState);

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  return { toggleState, handleToggle };
}

export default useToggle;