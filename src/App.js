import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import ThreadList from './components/ThreadList'
import Thread from './components/Thread'
import Navbar from './components/ForumNavbar'
import Footer from './components/ForumFooter'
import Register from './pages/Register'
import Signin from './pages/Signin'
import About from './pages/About'
import MyPage from './pages/MyPage'
import ForumContextProvider from './contexts/ForumContextProvider'
import UserContextProvider from './contexts/UserContextProvider'

const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
      <ForumContextProvider>
        <Router>         
          <Navbar/>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/about" component={About} />
                <Route exact path="/mypage" component={MyPage} />
                <Route exact path="/:id" component={ThreadList} />
                <Route exact path="/:id1/:id2" component={Thread} />
              </Switch>
            </div>
          <Footer/>              
        </Router>
      </ForumContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
