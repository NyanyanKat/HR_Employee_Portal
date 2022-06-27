import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import Registration from './components/Authentication/Registration';
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App(props) {

  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
