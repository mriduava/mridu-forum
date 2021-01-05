import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Home = () => {
  const { subjects, fetchFroumById } = useContext(ForumContext)

  const mapSubjects = () => {
    return subjects.map((subject, i) => {
      return (
        <Row key={'sub' + subject._id + i}>
          <Col xs="9" sm="6">
            <Link to={`/${subject.subject.toLowerCase()}`} 
              onClick={()=>fetchFroumById(subject._id, subject.subject)}>
              <h2 className="text-secondary mt-1">{subject.subject}</h2>
              <p className="text-primary">{subject.description}</p>
            </Link>       
          </Col>
          <Col xs="3" sm="3" className="mt-5 text-lg-center text-right">{subject.threads.length}</Col>
          <Col sm="3" className="text-right mt-5 d-none d-lg-block">200</Col>
        </Row>      
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      <Row className="text-light bg-secondary py-1">
        <Col xs="9" sm="6"><h3>Forums</h3></Col>
        <Col xs="3" sm="3" className="text-lg-center text-sm-right"><h3>Threads</h3></Col>
        <Col xs="0" sm="3" className="text-lg-right d-none d-lg-block"><h3>Posts</h3></Col>
      </Row>
      {subjects&&mapSubjects()}
    </Container>
  )
}

export default Home

