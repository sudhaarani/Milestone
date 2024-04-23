import React from 'react';
import FollowIcon from './FollowIcon';

function FollowButton({ timelineUserId, handleFollowedUsers, state, loggedInUserId }) {

  return (
    <div className='follow-button' onClick={() => {
      handleFollowedUsers(timelineUserId, loggedInUserId)
    }}>
      <div className=''>
        <FollowIcon selected={state && state.followedUsers ? state.followedUsers.includes(timelineUserId) : false} /> 
      </div>
    </div>
  );
}

export default FollowButton;


