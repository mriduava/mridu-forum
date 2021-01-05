import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Home = () => {
  const { subjects, fetchFroumById } = useContext(ForumContext)

  const mapSubjects = () => {
    return subjects.map((subject, i) => {
      return (
        <div key={'sub' + subject._id + i}>
          <Row>
            <Col xs="12" sm="8">
              <Link to={`/${subject.subject}`} style={{ textDecoration: 'none' }}
                onClick={()=>fetchFroumById(subject._id, subject.subject)}>
                <h2 className="text-secondary mt-1">{subject.subject}</h2>
                <p className="text-dark text-justify">{subject.description}</p>
              </Link>       
            </Col>
            <Col sm="4" className="mt-5 text-right d-none d-lg-block">
              <h5>{subject.threads.length}</h5>
            </Col>
          </Row>
          <hr/>
        </div>    
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      <Row className="text-white bg-secondary pt-2 mb-3">
        <Col xs="12" sm="8"><h4>Forums</h4></Col>
        <Col sm="4" className="text-right d-none d-lg-block"><h4>Threads</h4></Col>
      </Row>
      {subjects&&mapSubjects()}
    </Container>
  )
}

export default Home

