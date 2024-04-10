import React from 'react';

import '../styles/TimelineViewModal.css';
import closeSymbol from '../assets/closeSymbol.svg';
import MilestoneList from '../components/MilestoneList';
import SearchBar from '../components/SearchBar';

const TimelineViewModal = ({ handleToggle, state }) => {
  const { selectedTimeline } = state;
  const [keyword, setKeyword] = useState('');
  // console.log({ selectedTimeline })
  // console.log(state.milestonesByTimeline)
  return (
    <div className='timeline-edit-modal'>
      <button className="close-button" onClick={() => { handleToggle() }}>
        <img src={closeSymbol} alt='close symbol' />
      </button>
      <SearchBar keyword={keyword} onChange={updateKeyword} />
      {selectedTimeline &&
        (<div>
            {/* < PhotoFavButton id={selectedPhoto.id} favPhotos={state.favPhotos} favPhotosClick={favPhotosClick} /> */}
            {/* <img className="photo-details-modal__photographer-profile" src={selectedPhoto.user.profile} /> */}
          <p>{selectedTimeline.title}</p>
          <p>{selectedTimeline.description}</p>
          <div className="photo-details-modal__image">
              <MilestoneList state={state}
              />
          </div>
          <button>Edit Timeline</button>
        </div>)}
    </div>
  )
};

export default TimelineViewModal;
