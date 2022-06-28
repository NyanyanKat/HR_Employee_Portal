import Navigation from "./components/Navigation/Navigation";
import "./App.css";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopNavigation from './components/Navigation/TopNav/TopNavigation'
import auth from './utils/auth'

function App(props) {
  return (
    <div className="App">
      {!auth.loggedIn()
        ? <TopNavigation />
        : <Navigation />
      }
    </div>
  );
}

export default App;
