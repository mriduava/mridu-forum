import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { Row, Col } from 'reactstrap';
import { useSpring, animated } from 'react-spring'

const MyThreads= () => {
  const { user } = useContext(UserContext)
  const [myThreads, setMyThreads] = useState([])

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  useEffect(()=>{
    const fetchMyThreads = async () => {
      let allMyThreads = await fetch(`/search/mythreads?username=${user.username}`)
      allMyThreads = await allMyThreads.json();
      setMyThreads(allMyThreads)
    }
    fetchMyThreads()
  }, [user.username])

  const mapThreads = () => {
    return myThreads.map((thread, i) => {
      return (
        <ul key={'sub' + thread._id + i}>
          <li>
            {i+1}.
            <span> {thread.topic}</span>
          </li>    
        </ul>    
      )
    })
  }

  return ( 
    <Row>
      <Col lg="12">
        <animated.div className="my-threads" style={props}>
          {myThreads&&mapThreads()}
        </animated.div>
      </Col>
    </Row>
  )
}

export default MyThreads
