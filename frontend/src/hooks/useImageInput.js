import { useState } from 'react';

const useImageInput = (initialValue) => {
  const [imageInput, setImageInput] = useState(initialValue);

  const handleImageInput = (event) => {
    setImageInput(event.target.files[0]);
  };

  return {
    imageInput,
    handleImageInput,
    reset: () => setImageInput(initialValue)
  };
};

export default useImageInput;