import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Jumbotron from '../components/Jumbotron'

const Home = () => {
  const { subjects, fetchFroumById } = useContext(ForumContext)

  /**
  * Iterate forum subjects array, & display data.
  * onClick function call the fetchForumById method to get specific forum data.
  * Link navigate to the forum detial page.
  */
  const mapSubjects = () => {
    return subjects.map((subject, i) => {
      return (
        <div key={'sub' + subject._id + i}>
          <Row className="mx-0">
            <Col xs="12" sm="8">
              <Link to={`/${subject.subject}`} style={{ textDecoration: 'none' }}
                onClick={()=>fetchFroumById(subject._id, subject.subject)}>
                <h2 className="text-secondary mt-1 px-2">{subject.subject}</h2>
                <p className="text-dark text-justify px-2">{subject.description}</p>
              </Link>       
            </Col>
            <Col sm="4" className="mt-5 text-right d-none d-sm-block d-md-block d-lg-block pr-4">
              <h5>{subject.threads.length}</h5>
            </Col>
          </Row>
          <hr/>
        </div>    
      )
    })
  }

  return (
    <Container className="container mx-auto px-0" >
      <Row className="mx-0 px-0">
        <Col lg="12" className="px-0">
        <Jumbotron/>
        </Col>
      </Row>
      
      <Row className="text-white bg-secondary border border-rounded pt-2 mb-3"
        style={{margin: "0 0.5px 0 0.5px", borderRadius: "5px"}}>
        <Col xs="12" sm="8"><h4 className="pl-2">Forums</h4></Col>
        <Col sm="4" className="text-right d-none d-md-block d-sm-block d-lg-block"><h4>Threads</h4></Col>
      </Row>
      {subjects&&mapSubjects()}
    </Container>
  )
}

export default Home

