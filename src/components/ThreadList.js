import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const ThreadList = () => {
  const { threads, subjectId, subjectName, fetchThreadById } = useContext(ForumContext)

  const mapThreads = () => {
    return threads.map((thread, i) => {
      return (
        <div key={'sub' + thread._id + i}>
        <Row>
          <Col xs="9" sm="8">
            <Link to={`/${subjectName}/${thread.topic}`} style={{ textDecoration: 'none' }}
              onClick={()=>fetchThreadById(subjectId, thread._id)}>
              <h4 className="text-secondary mt-1 pb-0">{thread.topic}</h4>
              <p className="text-primary mt-0 pt-0">Writer: {thread.author.username.toUpperCase()}</p>
            </Link>       
          </Col>
          <Col xs="3" sm="4" className="text-right mt-2 d-none d-lg-block">{thread.posts.length}</Col>
        </Row>
        <hr/>
        </div>    
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      <Row className="text-light bg-info pt-2 mb-3">
        <Col xs="9" sm="8"><h4>Threads</h4></Col>
        <Col xs="3" sm="4" className="text-lg-right d-none d-lg-block"><h4>Answers</h4></Col>
      </Row>
      {threads && mapThreads()}
    </Container>
  )
}

export default ThreadList
