import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Home = () => {

  return (
    <Container className="themed-container" fluid="xl">
      <Row className="text-light bg-secondary py-1">
        <Col xs="9" sm="6"><h3>Forums</h3></Col>
        <Col xs="3" sm="3" className="text-lg-center text-sm-right"><h3>Threads</h3></Col>
        <Col xs="0" sm="3" className="text-lg-right d-none d-lg-block"><h3>Posts</h3></Col>
      </Row>

      <Row>
        <Col xs="9" sm="6">
          <Link to={`/forum`}>
            <h2 className="text-secondary mt-1">Anxiety</h2>
            <p className="text-primary">Space for discussion of generalised anxiety disorder (GAD), social anxiety, 
              phobias, obsessive compulsive disorder (OCD) and intrusive thoughts, panic 
              attacks, and eating disorders.
            </p>
          </Link>       
        </Col>
        <Col xs="3" sm="3" className="mt-5 text-lg-center text-right">1253</Col>
        <Col sm="3" className="text-right mt-5 d-none d-lg-block">200</Col>
      </Row>
      <hr/>
      <Row>
        <Col xs="9" sm="6">
          <Link to={`/forum`}>
            <h2 className="text-secondary mt-1">Depression</h2>
            <p className="text-primary">Space for discussion of major depression, bipolar disorder, cyclothymic and 
              dysthymic disorders, and BPD (borderline personality disorder).
            </p>
          </Link>       
        </Col>
        <Col xs="3" sm="3" className="mt-5 text-lg-center text-right">223</Col>
        <Col sm="3" className="text-right mt-5 d-none d-lg-block">5203</Col>
      </Row> 
      <hr/>
      <Row>
        <Col xs="9" sm="6">
          <Link to={`/forum`}>
            <h2 className="text-secondary mt-1">Trauma</h2>
            <p className="text-primary">Space for discussion of post-traumatic stress disorder (PTSD), domestic abuse, 
              sexual abuse and other traumatic life events. Please be aware that some content in this forum may be distressing.
            </p>
          </Link>      
        </Col>
        <Col xs="3" sm="3" className="mt-5 text-lg-center text-right">600</Col>
        <Col sm="3" className="text-right mt-5 d-none d-lg-block">2039</Col>
      </Row>  
      <hr/>    
    </Container>
  )
}

export default Home

