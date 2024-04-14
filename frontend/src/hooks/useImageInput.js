import { useState } from 'react';

const useImageInput = (initialValue) => {
  const [imageInput, setImageInput] = useState(initialValue);

  const handleImageInput = (event) => {
    setImageInput(event.target.files[0]);
  };

  const handleMultiImageInput = (event) => {
    console.log("event.target.files:", event.target.files);
    setImageInput(event.target.files);
  };


  const handleMultiEditImageInput = (images,event) => {
    const uploadedFiles = event.target.files;
    const updatedImages = [];
  
    // Loop through the total number of images you want to keep unchanged
    for (let i = 0; i < 3; i++) {
      console.log("images in event target:",images[i])
      // If there's an uploaded file for this index, use it; otherwise, keep the existing image
      updatedImages.push(uploadedFiles[i] || images[i]);
    }
  
    // Update the state with the updated image array
    setImageInput(updatedImages);
  };

  return {
    imageInput,
    handleImageInput,
    handleMultiImageInput,
    handleMultiEditImageInput,
    reset: () => setImageInput(initialValue)
  };
};

export default useImageInput;