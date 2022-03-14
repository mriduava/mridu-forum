import React, {useContext } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from '../contexts/UserContextProvider'
import WritingForm from './WritingForm'
import MyThreads from './MyThreads'

const Moderator = () => {
  const { user } = useContext(UserContext)

  return (
    <Container className="border border-warning pb-5" style={{minHeight:"80vh"}}>
      <Row className="d-flex flex-column">
        <Col xs="12" sm="12" md="12" lg="12" className="pl-3 pt-0"> 
          <h1 className="text-info font-weight-bold pt-5 ml-3">{user&&user.username.toUpperCase()}</h1>
          <h6 className="text-secondary ml-3">ROLE: <span className="text-success">{user&&user.role.toUpperCase()}</span></h6>
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
           <h4 className="ml-lg-3 mt-xs-5">My threads</h4>
           <hr className="ml-lg-3"/>
           <div className="ml-lg-3 mt-4">
              <MyThreads/>
           </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Moderator