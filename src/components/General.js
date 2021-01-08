import React, {useContext } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from '../contexts/UserContextProvider'
import WritingForm from './WritingForm'

const General = () => {
  const { user } = useContext(UserContext)

  return (
    <Container className="border border-warning pb-5" style={{minHeight:"80vh"}}>
      <Row className="d-flex flex-column">
        <Col xs="12" sm="8" md="6" lg="5" className="pl-3 pt-0"> 
          <h1>{user&&user.username}</h1>
          <h5 className="text-info font-weight-bold pt-5 ml-3">GENERAL</h5>
        </Col>
      </Row>
      <hr/>
      <Row className="mx-auto">
        <Col xs="12" sm="12" md="6" lg="6">
          <h4 className="ml-0">Create a thread</h4>
          <hr className="ml-1"/>
          <WritingForm/>
        </Col>
         <Col xs="12" sm="12" md="6" lg="6">
           <h4 className="ml-3">My threads</h4>
           <hr className="ml-3"/>
        </Col>
      </Row>
    </Container>
  )
}

export default General