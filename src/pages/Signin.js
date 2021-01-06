import React, {useState, useContext} from 'react';
import { UserContext } from '../contexts/UserContextProvider'
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Signin = (props) => {
  const { setLoggedIn } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const loginUser = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username,
      password: password
    }
    await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        setLoggedIn(res)
        props.history.push('/')
      } else {
        setMessage("Username or Password incorrect!")
      }
    })
  }

  return (
    <Container>
      <Row className="border border-warning pb-5">
        <Col xs="12" sm="8" md="6" lg="5" className="mx-auto m-5 border border-rounded p-5"> 
          <h4 className="text-dark font-weight-bold">Sign in</h4>
          <hr/>
          <Form onSubmit={loginUser}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="username" name="username" id="username" 
                value={username} onChange={e=>setUsername(e.target.value)} required/>
              <FormFeedback valid>Username is not correct!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password"
                value={password} onChange={e=>setPassword(e.target.value)} required/>
              <FormFeedback>Wrong password!</FormFeedback>
            </FormGroup>
            <button className="btn btn-block btn-outline-success mt-4">SUBMIT</button>
            <div className="pt-2 text-danger">{message}</div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signin
