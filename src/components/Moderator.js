import React, {useContext} from 'react'
import { Container, Row, Col } from 'reactstrap';
import { UserContext } from '../contexts/UserContextProvider'

const Moderator = () => {
  const { user } = useContext(UserContext)
  return (
    <Container className="border border-warning pb-5" style={{minHeight:"80vh"}}>
      <h4 className="text-dark font-weight-bold pt-5">MODERATOR</h4>
      <hr/>
      <Row className="d-flex flex-column">
        <Col xs="12" sm="8" md="6" lg="5" className="pl-3 pt-0"> 
          <h1>{user&&user.username}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Moderator
