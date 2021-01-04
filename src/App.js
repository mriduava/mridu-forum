import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import ForumContextProvider from './contexts/ForumContextProvider'

const App = () => {
  return (
    <div className="App">
    <ForumContextProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Router>
    </ForumContextProvider>
    </div>
  );
}

export default App;
