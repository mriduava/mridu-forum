import React, {useState, useContext} from 'react'
// import { UserContext } from '../contexts/UserContextProvider'
import { Container, Row, Col, Form, FormGroup, Input, FormFeedback, Button } from 'reactstrap';

const MyPage = () => {
  // const { user, searchUser } = useContext(UserContext)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState()
  // const [role, setRole] = useState('')

    // FETCH ALL USERS
  const searchUser = async (e) => {
    e.preventDefault();    
    let user = await fetch(`/search/user?username=${search}&role=${search}`)
    user = await user.json();
    setUser(user)
    setSearch('')
  }

  const dispUserInfo =() => {
    return user.map((info, i) => {
      return (
        <div key={'sub' + info._id + i}>
          <Row className="pt-2">
            <Col xs="9" sm="8">  
              <h4 className="text-secondary mt-1 pb-0">{info.username}</h4>
              <p className="text-primary mt-0 pt-0">role: {info.role}</p>
            </Col>         
          </Row>
          <hr/>
        </div>    
      )
    })
  }

  return (
     <Container className="border border-warning pb-5">
      <h4 className="text-dark font-weight-bold pt-5">ADMIN</h4>
      <hr/>
      <Row>
        <Col xs="12" sm="8" md="6" lg="5" className="pl-3 pt-0"> 
          <Form onSubmit={searchUser} className="d-flex">
            <FormGroup>
              <Input type="username" name="username" id="username" placeholder="Search user"
                className="border border-secondary" style={{height: "32px"}}
                value={search} onChange={e=>setSearch(e.target.value)} required/>
              <FormFeedback valid>Username is not correct!</FormFeedback>
            </FormGroup>
            <button className="btn btn-outline-secondary py-0" style={{height: "32px"}}>Search</button>
          </Form>
        </Col>
      </Row>
      {user&&dispUserInfo()}
    </Container>
  )
}

export default MyPage
