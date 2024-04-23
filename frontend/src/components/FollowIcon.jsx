import React from 'react';

const FollowIcon = ({ selected }) => {
  return (
    <div>
      <i className={selected ? 'fa-solid fa-user-check' : 'fa-regular fa-user'} />
      {/* selected={ state.followedUsers ? state.followedUsers.includes(user_id) : false} */}
    </div>
  );
};

export default FollowIcon;