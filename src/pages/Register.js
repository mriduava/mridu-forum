import React, {useState, useContext} from 'react';
import { UserContext } from '../contexts/UserContextProvider'
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const Register = (props) => {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  //CHECK WHITE SPACE, & LENGTH OF THE STRING
  const isValidData = (value, stringLength) => {
    let inValid = new RegExp('^[_A-z0-9]{1,}$');
    let result = inValid.test(value);
    if(result && value.length >= stringLength){
     return true;
    }
    return false;
  }

  const registerUser = async(e) => {
    e.preventDefault();
    if (!isValidData(username, 3)) {
       setMessage("Username must be at least 3 characters without space!")
       return;
    }
    if (!isValidData(password, 6)) {
       setMessage("Password must be at least 6 characters without space!")
       return;
    }
    const credentials = {
      username,
      password
    }      
    await fetch('/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        response = response.json();
        Promise.resolve(response)
        .then(user => setUser(user))          
        props.history.push('/signin') 
      } else {  
        setMessage("Username is used!")
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }

  return (
    <Container className="border border-warning pb-5" style={{minHeight:"80vh"}}>
      <Row>
        <Col xs="12" sm="8" md="6" lg="5" className="mx-auto m-5 border border-rounded p-5"> 
          <h4 className="text-dark font-weight-bold">Registration</h4>
          <hr/>
          <Form onSubmit={registerUser}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="username" name="username" id="username"
                value={username} onChange={e=>setUsername(e.target.value)} required/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password"
                value={password} onChange={e=>setPassword(e.target.value)} required/>
            </FormGroup>
            <button className="btn btn-block btn-outline-success mt-4">SUBMIT</button>
            <div className="pt-2 text-danger">{message}</div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
