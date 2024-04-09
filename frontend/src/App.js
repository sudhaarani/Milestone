import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar isLoggedIn={true} username={"Labber"} />
    </div>
  );
}

export default App;
