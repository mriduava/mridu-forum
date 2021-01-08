import React, {useContext, useState} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import moment from 'moment'

const Thread = () => {
  const { thread, subjectId, threadId } = useContext(ForumContext)
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')

  const timeFormat = (time) => {
    return moment(time).format("YYYY-MM-DD, H:mm");
  }

  const writeComment = async (e) => {
    e.preventDefault();

    await fetch(`/api/forums/${subjectId}/${threadId}`, {
      method: 'POST',
      body: JSON.stringify({text:comment}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      response = response.json();
      if (response.ok) {
        response = response.json();
        Promise.resolve(response)
        .then(message => setMessage(message));
        setComment(''); 
        console.log(message);         
      } else {
        setMessage("You are not logged in!")
        console.log(message);
      }
    })
    .catch((error) => {
      return Promise.reject()
    });
  }

  const mapThreads = () => {
      return (
        <div key={'sub' + thread._id}>
          <Row className="text-light bg-success pt-2">
            <Col xs="9" sm="8"><h4>Topic: {thread.topic}</h4></Col>
            <Col xs="3" sm="4" className="text-lg-right d-none d-lg-block"><h4>{thread.posts.length} Comments</h4></Col>
          </Row>
          <Row className="mt-3">
            <Col xs="3" sm="3">
              <p className="mb-0 text-danger">Writer</p>
              <h4 className="text-secondary">{thread.author.username.toUpperCase()}</h4>              
            </Col>
            <Col xs="9" sm="9">
              <p className="mb-0">{timeFormat(thread.created)}</p>
              <p className="text-dark mt-1 text-justify">{thread.text}</p>
              <hr className="p-0 m-0"/>

              <button className="btn btn-outline-success mt-3 mr-2" 
                  style={{height: "26px", width: "90px", fontSize: "13px", paddingTop: "2px"}}>Reply
              </button>
              <button className="btn btn-outline-primary mt-3 mr-2" 
                  style={{height: "26px", width: "90px", fontSize: "13px", paddingTop: "2px"}}>Edit
              </button>
              <button className="btn btn-outline-danger mt-3" 
                  style={{height: "26px", width: "90px", fontSize: "13px", paddingTop: "2px"}}>Delete
              </button> 
            </Col>  
          </Row>
           <hr/>
          <Row>  
            <Col xs="3" sm="3">
            </Col>       
            <Col xs="9" sm="9">
              <Form onSubmit={writeComment}>
                <FormGroup>
                  <Input type="textarea" name="text" id="text" placeholder="Write your comment here..." 
                    value={comment} onChange={e=>setComment(e.target.value)} required/>
                </FormGroup>
                <button className="btn btn-outline-success mt-0" 
                  style={{height: "26px", width: "162px", fontSize: "13px", paddingTop: "2px"}}>Submit Comment
                </button>
              </Form>
              <button className="btn btn-outline-danger mt-0" 
                style={{position: "absolute", left: 185, top: 78, height: "26px", width: "120px", fontSize: "13px", paddingTop: "2px"}}>Cancel
              </button>          
            </Col>
          </Row>
          <hr/>
        </div>     
      )
  }

  const mapThreadPosts = () => {
    return thread.posts.map((post, i) => {
      return (
        <div key={'pos' + post._id}>
          <Row>
            <Col xs="3" sm="3">
              <p className="mb-0 text-success">Replied by</p>
              <h5 className="text-secondary">{post.author.username.toUpperCase()}</h5>
            </Col>
            <Col xs="9" sm="9">
              <p className="mb-0">{timeFormat(post.created)}</p>
              <p className="text-secondary mt-1 text-justify">{post.text}</p>     
            </Col>
          </Row>
          <hr/>
        </div>  
      )
    })
  }

  return (
    <Container className="themed-container" fluid="xl">
      {thread && mapThreads()}
      {thread && mapThreadPosts()}
    </Container>
  )
}

export default Thread