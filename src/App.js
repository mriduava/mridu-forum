import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Router>
    </div>
  );
}

export default App;
