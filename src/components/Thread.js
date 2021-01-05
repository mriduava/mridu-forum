import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment'

const Thread = () => {
  const { thread } = useContext(ForumContext)

  const timeFormat = (time) => {
    return moment(time).format("YYYY-MM-DD, H:mm");
  }

  const mapThreads = () => {
      return (
        <div key={'sub' + thread._id}>
          <Row className="text-light bg-secondary pt-2">
            <Col xs="9" sm="8"><h4>Topic: {thread.topic}</h4></Col>
            <Col xs="3" sm="4" className="text-lg-right d-none d-lg-block"><h4>{thread.posts.length} Comments</h4></Col>
          </Row>
          <Row className="mt-3">
            <Col xs="3" sm="3">
              <p className="mb-0 text-danger">Writer</p>
              <h4 className="text-secondary">{thread.author.username.toUpperCase()}</h4>
            </Col>
            <Col xs="9" sm="9">
              <p className="mb-0">{timeFormat(thread.created)}</p>
              <p className="text-dark mt-1 text-justify">{thread.text}</p> 
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
              <p className="mb-0 text-success">Replied by</p>
              <h5 className="text-secondary">{post.author.username.toUpperCase()}</h5>
            </Col>
            <Col xs="9" sm="9">
              <p className="mb-0">{timeFormat(post.created)}</p>
              <p className="text-secondary mt-1 text-justify">{post.text}</p>     
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