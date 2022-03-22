import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Jumbotron from '../components/Jumbotron';
import { useSpring, animated } from 'react-spring'

const Home = () => {
  const { subjects, fetchFroumById } = useContext(ForumContext);
  const animate = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  /**
  * Iterate forum subjects array, & display data.
  * onClick function call the fetchForumById method to get specific forum data.
  * Link navigate to the forum detial page.
  */
  const mapSubjects = () => {
    return subjects.map((subject, i) => {
      return (
        <animated.div key={'sub' + subject._id + i} style={animate}>
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
        </animated.div>    
      )
    })
  }

  return (
    <div>
    <Container fluid className="px-0">
      <Row className="mx-0 px-0 jumbotron-area">
        <Col lg="12" className="px-0">
          <Jumbotron/>
        </Col>
      </Row>
    </Container>

      <Container className="mx-auto px-0">      
        <Row className="foram-area">
          <Col lg="12">
            <Row className="text-white border border-rounded pt-2 mb-1 forum-bar"
              style={{margin: "0 0.5px 0 0.5px", borderRadius: "5px"}}>
              <Col xs="12" sm="8"><h4 className="pl-2">Forums</h4></Col>
              <Col sm="4" className="text-right d-none d-md-block d-sm-block d-lg-block"><h4>Threads</h4></Col>
            </Row>
            {subjects&&mapSubjects()}
          </Col>
        </Row>      
      </Container>
    </div>
  )
}

export default Home

