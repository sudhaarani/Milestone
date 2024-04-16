import '../styles/FullImageModal.css';

const FullImageModal = ({ imageUrl, closeModal }) => {
  return (
    <div className="full-image-modal" onClick={closeModal}>
      <img src={imageUrl} alt="full-size" />
    </div>
  );
};

export default FullImageModal;
