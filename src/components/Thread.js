import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Thread = () => {
  const { thread } = useContext(ForumContext)

  const mapThreads = () => {
      return (
        <div key={'sub' + thread._id}>
          <Row className="text-light bg-secondary py-1">
            <Col xs="9" sm="8"><h3>Topic: {thread.topic}</h3></Col>
            <Col xs="3" sm="4" className="text-lg-right d-none d-lg-block"><h3>Answer: {thread.posts.length}</h3></Col>
          </Row>
          <Row>
            <Col xs="12" sm="12">
              <Link to={`/`}>
                <h3 className="text-secondary mt-1">{thread.author.username.toUpperCase()}</h3>
                <p className="text-secondary mt-1">{thread.text}</p>
              </Link>       
            </Col>
          </Row> 
          <hr/>
        </div>     
      )
  }

  const mapThreadPosts = () => {
    return thread.posts.map((post, i) => {
      return (
        <div key={'pos' + post._id}>
          <Row>
            <Col xs="3" sm="3">
              <h4 className="text-secondary mt-1">{post.author.username.toUpperCase()}</h4>
            </Col>
            <Col xs="9" sm="9">
              <p className="text-secondary mt-1">{post.text}</p>     
            </Col>
          </Row>
          <hr/>
        </div>  
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      {thread && mapThreads()}
      {thread && mapThreadPosts()}
    </Container>
  )
}

export default Thread