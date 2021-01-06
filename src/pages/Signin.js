import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Signin = (props) => {
  return (
    <Container>
      <Row className="border border-warning pb-5">
        <Col xs="12" sm="8" md="6" lg="5" className="mx-auto m-5 border border-rounded p-5"> 
          <h4 className="text-dark font-weight-bold">Sign in</h4>
          <hr/>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input />
              <FormFeedback valid>Username is not correct!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input />
              <FormFeedback>Wrong password!</FormFeedback>
            </FormGroup>
            <button className="btn btn-block btn-outline-success mt-4">SUBMIT</button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signin
