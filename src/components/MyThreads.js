import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { Row, Col } from 'reactstrap';

const MyThreads= () => {
  const { user } = useContext(UserContext)
  const [myThreads, setMyThreads] = useState([])

  /**
  * Search thereads by the username who is logged in.
  * Populate data to myThreads state.
  */
  useEffect(()=>{
    const fetchMyThreads = async () => {
      let allMyThreads = await fetch(`/search/mythreads?username=${user.username}`)
      allMyThreads = await allMyThreads.json();
      setMyThreads(allMyThreads)
    }
    fetchMyThreads()
  }, [user.username])

  /**
  * Iterate myThreads array, and display data.
  */
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
        <div className="my-threads">
          {myThreads&&mapThreads()}
        </div>
      </Col>
    </Row>
  )
}

export default MyThreads
