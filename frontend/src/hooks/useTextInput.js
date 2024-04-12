import { useState } from 'react';

const useTextInput = (initialValue) => {
  const [textInput, setTextInput] = useState(initialValue);

  const handleTextInput = (event) => {
    setTextInput(event.target.value);
  };

  return {
    textInput,
    handleTextInput,
    reset: () => setTextInput(initialValue)
  };
};

export default useTextInput;