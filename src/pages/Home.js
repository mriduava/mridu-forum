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
          <Col xs="9" sm="8">
            <Link to={`/${subject.subject}`} 
              onClick={()=>fetchFroumById(subject._id, subject.subject)}>
              <h2 className="text-secondary mt-1">{subject.subject}</h2>
              <p className="text-primary">{subject.description}</p>
            </Link>       
          </Col>
          <Col xs="3" sm="4" className="mt-5 text-right">{subject.threads.length}</Col>
        </Row>      
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      <Row className="text-light bg-secondary py-1">
        <Col xs="9" sm="8"><h3>Forums</h3></Col>
        <Col xs="3" sm="4" className="text-right"><h3>Threads</h3></Col>
      </Row>
      {subjects&&mapSubjects()}
    </Container>
  )
}

export default Home

