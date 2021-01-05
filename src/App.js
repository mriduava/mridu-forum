import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home'
import ThreadList from './components/ThreadList'
import Thread from './components/Thread'
import Navbar from './components/ForumNavbar'
import Footer from './components/ForumFooter'
import About from './pages/About'
import ForumContextProvider from './contexts/ForumContextProvider'

const App = () => {
  return (
    <div className="App">
    <ForumContextProvider>
      <Router>
        <Navbar/>
        <div className="content">
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={ThreadList} />
        <Route exact path="/:id1/:id2" component={Thread} />
        <Route exact path="/about" component={About} />
        </div>
        <Footer/>
      </Router>
    </ForumContextProvider>
    </div>
  );
}

export default App;
