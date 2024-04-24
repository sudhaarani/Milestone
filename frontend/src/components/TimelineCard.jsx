import React, {useState} from 'react';
import '../styles/TimelineCard.css'
import FavButton from "./FavButton";
import FollowButton from './FollowButton';


const TimelineCard = ({isLoggedIn, timelineList, timelineToggle, handleSelectedTimeline, handleFavourites,
  state, getMilestonesByTimeline,timelineEditToggle,handleDeleteTimeline,getTimelinesOf1User,toggleFollowSymbol, handleFollowedUsers, userId }) => {
  const { id, user_id, username, title, description, timelineImageUrl } = timelineList;

    // note: do not mixed up user_id and userId. userId = id of logged in user. user_id = owner of selected timeline
    const showFollow = userId !== user_id 
      // if showFollow = true, timeline owner and logged in user are 2 different people. 
      // if showFollow = false, timeline owner and logged in user are the same person. 

  return (
    <div className='card'>
      <img src={timelineImageUrl} className='card-img-top' alt={title} onClick={() => { 
              timelineToggle.handleToggle()
              handleSelectedTimeline(id)
              getMilestonesByTimeline(id)
            }} 
      />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
      </div>
      <div className='card-footer'>
        <div className='card-username' onClick={() => {getTimelinesOf1User(user_id)}}>
          By <p>{username}</p>
        </div>

        {isLoggedIn && showFollow && <FollowButton loggedInUserId={userId} timelineUserId={user_id} handleFollowedUsers={handleFollowedUsers} state={state}/>}

        {isLoggedIn && <FavButton timelineId={id} userId={userId} handleFavourites={handleFavourites} state={state} />}
      </div>
    </div>
  );
}

export default TimelineCard;