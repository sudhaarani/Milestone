// import React from 'react';
// import TimelineCard from './TimelineCard';
// import '../styles/ListOfTimelines.css'

// const ListOfTimelines = ({ state, handleToggle, handleSelectedTimeline, handleFavourites }) => {
//   const TimelineListArray = state.timelines.map((timelineList) => {
//     return (<TimelineCard 
//               key={timelineList.id}
//               timelineList={timelineList}
//               handleToggle={handleToggle}
//               handleSelectedTimeline={handleSelectedTimeline}
//               state={state}
//               handleFavourites={handleFavourites}
//             />)
//   });

//   return (
//     <div className='timelines-card-list'>
//       {TimelineListArray}
//     </div>
//   );
// };

// export default ListOfTimelines;

// import React from 'react';
// import TimelineCard from './TimelineCard';
// import '../styles/ListOfTimelines.css'

// const ListOfTimelines = ({ state, handleToggle, handleSelectedTimeline, handleFavourites }) => {
//   const handleUsernameClick = async (userId, event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:8001/api/timelines/${userId}`);
//       const userTimelines = await response.json();
//       // Update the state with the timelines of the clicked user
//     } catch (error) {
//       console.error('Error fetching timelines:', error);
//     }
//   };

//   const TimelineListArray = state.timelines.map((timelineList) => {
//     return (<TimelineCard 
//               key={timelineList.id}
//               timelineList={timelineList}
//               handleToggle={handleToggle}
//               handleSelectedTimeline={handleSelectedTimeline}
//               state={state}
//               handleFavourites={handleFavourites}
//               handleUsernameClick={handleUsernameClick} // Pass the function as a prop
//             />)
//   });

//   return (
//     <div className='timelines-card-list'>
//       {TimelineListArray}
//     </div>
//   );
// };

// export default ListOfTimelines;

// import React, { useState, useEffect } from 'react';
// import TimelineCard from './TimelineCard';
// import '../styles/ListOfTimelines.css'

// const ListOfTimelines = ({ state, handleToggle, handleSelectedTimeline, handleFavourites }) => {
//   const [usernameToId, setUsernameToId] = useState({});

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`http://localhost:8001/api/users`);
//         const users = await response.json();
//         const newUsernameToId = {};
//         for (let user of users) {
//           newUsernameToId[user.username] = user.id;
//         }
//         setUsernameToId(newUsernameToId);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleUsernameClick = async (username, event) => {
//     event.preventDefault();
//     const userId = usernameToId[username];

//     try {
//       const response = await fetch(`http://localhost:8001/api/timelines/${userId}`);
//       const userTimelines = await response.json();
//       console.log("handleUserNameClick", userTimelines);
//       // Update the state with the timelines of the clicked user
//     } catch (error) {
//       console.error('Error fetching timelines:', error);
//     }
//   };

//   const TimelineListArray = state.timelines.map((timelineList) => {
//     return (<TimelineCard 
//               key={timelineList.id}
//               username={timelineList.username}
//               timelineList={timelineList}
//               handleToggle={handleToggle}
//               handleSelectedTimeline={handleSelectedTimeline}
//               state={state}
//               handleFavourites={handleFavourites}
//               handleUsernameClick={handleUsernameClick} // Pass the function as a prop
//             />)
//   });

//   return (
//     <div className='timelines-card-list'>
//       {TimelineListArray}
//     </div>
//   );
// };

// export default ListOfTimelines;

import React, { useState, useEffect } from 'react';
import TimelineCard from './TimelineCard';
import '../styles/ListOfTimelines.css'

const ListOfTimelines = ({ state, isLoggedIn, handleToggle, handleSelectedTimeline, handleFavourites }) => {
  const [usernameToId, setUsernameToId] = useState({});
  const [userTimelines, setUserTimelines] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/users`);
        const users = await response.json();
        const newUsernameToId = {};
        for (let user of users) {
          newUsernameToId[user.username] = user.id;
        }
        setUsernameToId(newUsernameToId);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUsernameClick = async (username, event) => {
    event.preventDefault();
    const userId = usernameToId[username];

    try {
      const response = await fetch(`http://localhost:8001/api/timelines/${userId}`);
      const userTimelines = await response.json();
      setUserTimelines(userTimelines);
    } catch (error) {
      console.error('Error fetching timelines:', error);
    }
  };

  const timelinesToRender = userTimelines || state.timelines;

  const TimelineListArray = timelinesToRender.map((timelineList) => {
    return (<TimelineCard 
              key={timelineList.id}
              username={timelineList.username}
              timelineList={timelineList}
              handleToggle={handleToggle}
              handleSelectedTimeline={handleSelectedTimeline}
              state={state}
              isLoggedIn={isLoggedIn}
              handleFavourites={handleFavourites}
              handleUsernameClick={handleUsernameClick} // Pass the function as a prop
            />)
  });

  return (
    <div className='timelines-card-list'>
      {TimelineListArray}
    </div>
  );
};

export default ListOfTimelines;