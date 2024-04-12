import { useState } from 'react';

const useImageInput = (initialValue) => {
  const [imageInput, setImageInput] = useState(initialValue);

  const handleImageInput = (event) => {
    setImageInput(event.target.files[0]);
  };

  const handleMultiImageInput = (event) => {
    setImageInput(event.target.files);
  };

  return {
    imageInput,
    handleImageInput,
    handleMultiImageInput,
    reset: () => setImageInput(initialValue)
  };
};

export default useImageInput;