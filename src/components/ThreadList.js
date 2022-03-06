import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useSpring, animated } from 'react-spring'

const ThreadList = () => {
  const { threads, subjectId, subjectName, fetchThreadById } = useContext(ForumContext);

   const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  const mapThreads = () => {
    return threads.map((thread, i) => {
      return (
        <div key={'sub' + thread._id + i}>
        <Row>
          <Col xs="9" sm="8">
            <Link to={`/${subjectName}/${thread.topic}`} style={{ textDecoration: 'none' }}
              onClick={()=>fetchThreadById(subjectId, thread._id)}>
              <h5 className="text-secondary mt-1 pb-0">{thread.topic}</h5>
              <p className="text-primary mt-0 pt-0">Writer: {thread.author.username.toUpperCase()}</p>
            </Link>       
          </Col>
          <Col xs="3" sm="4" className="text-right mt-2 d-none d-lg-block">{thread.posts.length}</Col>
        </Row>
        <hr className="mt-1"/>
        </div>    
      )
    })
  }

  return (
    <Container className="themed-container">
      <Row className="text-light pt-2 mb-3 thread-bar">
        <Col xs="9" sm="8">
        <h5>
          <Link to={`/`} style={{ textDecoration: 'none' }}>
            <span className="subject-name"> Home </span> 
          </Link>
            &#187; {subjectName} 
        </h5>
        </Col>
        <Col xs="3" sm="4" className="text-lg-right d-none d-lg-block"><h5>Answers</h5></Col>
      </Row>
      <animated.div style={props}>{threads && mapThreads()}</animated.div>
    </Container>
  )
}

export default ThreadList
