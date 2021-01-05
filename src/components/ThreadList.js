import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const ThreadList = () => {
  const { threads, subjectId, subjectName, fetchThreadById } = useContext(ForumContext)

  const mapThreads = () => {
    return threads.map((thread, i) => {
      return (
        <Row key={'sub' + thread._id + i}>
          <Col xs="9" sm="8">
            <Link to={`/${subjectName}/${thread.topic}`} 
              onClick={()=>fetchThreadById(subjectId, thread._id)}>
              <h2 className="text-secondary mt-1">{thread.topic}</h2>
              <p className="text-primary">WRITER: {thread.author.username.toUpperCase()}</p>
            </Link>       
          </Col>
          <Col xs="3" sm="4" className="text-right mt-5 d-none d-lg-block">{thread.posts.length}</Col>
        </Row>      
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      <Row className="text-light bg-secondary py-1">
        <Col xs="9" sm="8"><h3>Threads</h3></Col>
        <Col xs="3" sm="4" className="text-lg-right d-none d-lg-block"><h3>Answers</h3></Col>
      </Row>
      {threads && mapThreads()}
    </Container>
  )
}

export default ThreadList
