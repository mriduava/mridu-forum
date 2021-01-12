import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { Row, Col } from 'reactstrap';

const MyThreads= () => {
  const { user } = useContext(UserContext)
  const [myThreads, setMyThreads] = useState([])

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
            <span className="text-secondary">{i+1}. </span> 
            <span className="text-info"> {thread.topic}</span>
          </li>    
        </ul>    
      )
    })
  }

  return ( 
    <Row>
      <Col lg="12">
        <div className="my-threads">
          {myThreads&&mapThreads()}
        </div>
      </Col>
    </Row>
  )
}

export default MyThreads
