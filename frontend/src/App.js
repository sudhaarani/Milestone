import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import HomePage from './components/HomePage';
import MainModal from './components/MainModal';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';
import NewMilestoneForm from './components/NewMilestoneForm';
import MyTimelines from './components/MyTimelines';
import FavouritesPage from './components/FavouritesPage';

import useApplicationData from "./hooks/useApplicationData"; // Adjusted the path for hooks
import useToggle from "./hooks/useToggle";

function App() {
  const { state, handleHomePage, handleSelectedTimeline, handleFavourites, handleFavouritesPage } = useApplicationData();
  const { toggleState, handleToggle} = useToggle();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router> {/* Use Router to wrap the application */}
      <div className="App">
        <NavBar username={"Labber"} handleFavouritesPage={handleFavouritesPage} handleHomePage={handleHomePage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomePage
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            state={state} 
            handleToggle={handleToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites} 
          />} />
          <Route path="/create-new" element={<NewTimelineForm />} />

          <Route path="/timelines/:id" element={<MyTimelines 
            state={state} 
            handleToggle={handleToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites} 
          />} />

          <Route path="/favourites" element={<FavouritesPage
            state={state} 
            handleToggle={handleToggle} 
            handleSelectedTimeline={handleSelectedTimeline}
            handleFavourites={handleFavourites}
            isLoggedIn={isLoggedIn} 
           />} />

        </Routes>

        {toggleState && <MainModal handleToggle={handleToggle} state={state} />}

        <NewMilestoneForm />
      </div>
    </Router>
  );
}

export default App;
