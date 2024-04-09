import './App.css';
import NavBar from './components/NavBar';
import NewTimelineForm from './components/NewTimelineForm';
import { useEffect, useState } from 'react';

function App() {
  /////////// TEMP CODE TO DISPLAY TIMELINE INFO ////////// 
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    fetch('/api/timelines', {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setTimelines(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  ////////////////////////////////////////////////////////

  return (
    <div className="App">
        <NavBar isLoggedIn={true} username={"Labber"} />
        <NewTimelineForm />
        { timelines.map((timeline) => (
        <div key={timeline.id}>
          <img src={timeline.timelineImageUrl} alt={timeline.title} />
          <h1>{timeline.title}</h1>
          <p>{timeline.description}</p>
        </div>))
      }
    </div>
  );
}

export default App;
