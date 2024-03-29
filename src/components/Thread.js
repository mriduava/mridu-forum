import React, {useContext, useState} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import { Container, Row, Col, Form, FormGroup, Fade } from 'reactstrap';
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import moment from 'moment'

const Thread = () => {
  const { subjectName, thread, subjectId, threadId, fetchThreadById } = useContext(ForumContext)
  const { user } = useContext(UserContext)
  const [comment, setComment] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editText, setEditText] = useState('');

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  const timeFormat = (time) => {
    return moment(time).format("YYYY-MM-DD, H:mm");
  }

  const toggleButton = () =>  setShowForm(!showForm)
  const toggleEditButton = () => setShowEditForm(!showEditForm)

  const editThread = async (e) => {
    e.preventDefault();
    await fetch(`/api/forums/${subjectId}/${threadId}`, {
      method: 'PUT',
      body: JSON.stringify({
        topic:thread.topic,
        text:editText}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        fetchThreadById(subjectId, threadId)
        setEditText('')
        toggleEditButton()
      } 
    })
  }


  const renderEditForm = ()=>{
    return(
      <>
        <Row>  
          <Col xs="12" sm="3">
            <h5 className="text-secondary">{user.username.toUpperCase()}</h5>
            <p className="pb-2 text-warning">is going to modify</p>
          </Col>       
          <Col xs="12" sm="9">
            <Form onSubmit={editThread}>
              <FormGroup>
                <textarea name="text" id="text" placeholder="Write your comment here..." 
                  className="form-control" pattern=".{20, 5000}" required minLength="20" 
                  defaultValue={thread.text} onChange={e=>setEditText(e.target.value)}></textarea>
              </FormGroup>
              <button className="btn btn-outline-success mt-0" 
                style={{height: "26px", width: "162px", fontSize: "13px", paddingTop: "2px"}}>Submit Updated Text
              </button>
            </Form>
            <button className="btn btn-outline-danger mt-0" onClick={()=>toggleEditButton()}
              style={{position: "relative", left: 170, top: -25, height: "26px", 
              width: "120px", fontSize: "13px", paddingTop: "2px"}}>Cancel
            </button>          
          </Col>
        </Row>
        <hr/>
      </>
    )
  }

  const deleteThread = async () => {
    await fetch(`/api/forums/${subjectId}/${threadId}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.ok) {
        props.history.push('/')     
      } 
    })
    .catch((error) => {
      return Promise.reject()
    });
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
      setComment('');
      toggleButton()
      fetchThreadById(subjectId, threadId)
    })
    .catch((error) => {
      return Promise.reject()
    });
  }

  const renderForm = ()=>{
    return(
      <>
        <Row>  
          <Col xs="12" sm="3">
            <h5 className="text-secondary">{user.username.toUpperCase()}</h5>
            <p className="pb-2 text-warning">is going to reply</p>
          </Col>       
          <Col xs="12" sm="9">
            <Form onSubmit={writeComment}>
              <FormGroup>
                <textarea name="text" id="text" placeholder="Write your comment here..." 
                  className="form-control" pattern=".{100, 5000}" required minLength="100" 
                  value={comment} onChange={e=>setComment(e.target.value)}></textarea>
              </FormGroup>
              <button className="btn btn-outline-success mt-0" 
                style={{height: "26px", width: "162px", fontSize: "13px", paddingTop: "2px"}}>Submit Comment
              </button>
            </Form>
            <button className="btn btn-outline-danger mt-0" onClick={()=>toggleButton()}
              style={{position: "relative", left: 170, top: -25, height: "26px", 
              width: "120px", fontSize: "13px", paddingTop: "2px"}}>Cancel
            </button>          
          </Col>
        </Row>
        <hr/>
      </>
    )
  }

  const mapThreads = () => {
      return (
        <div key={'sub' + thread._id}>
          <Row className="text-light pt-2 thread-bar">
            <Col xs="12" sm="12" md="8">
              <h5>
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                  <span className="subject-name"> Home </span> 
                </Link>
                 &#187; 
                <Link to={`/${subjectName}`} style={{ textDecoration: 'none' }}>
                  <span className="subject-name"> {subjectName} </span> 
                </Link>
                &#187; {thread.topic}
              </h5>
            </Col>
            <Col xs="0" sm="0" md="4" className="text-lg-right d-none d-lg-block"><h5>{thread.posts.length} Comments</h5></Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" sm="3">
              <p className="mb-0 text-danger">Writer</p>
              <h4 className="text-secondary pb-2">{thread.author.username.toUpperCase()}</h4>              
            </Col>
            <Col xs="12" sm="9">
              <p className="mb-0">{timeFormat(thread.created)}</p>
              <p className="text-dark mt-1 text-justify" style={{whiteSpace: "pre-wrap"}}>{thread.text}</p>         
              {(() => {
                if (user!==null) {
                  return (
                    <>
                    <hr className="p-0 m-0"/>
                    <button className="btn btn-outline-success mt-3 mr-2" onClick={()=>toggleButton()}
                        style={{height: "26px", width: "90px", fontSize: "13px", paddingTop: "2px"}}>Reply
                    </button>
                    </>
                  )
                }
              })()}
              {(() => {      
                if (user !==null && (user.id === thread.author.id || user.role === 'admin' || user.role === 'moderator')) {
                  return (
                    <>
                    <button className="btn btn-outline-primary mt-3 mr-2" onClick={()=>toggleEditButton()}
                        style={{height: "26px", width: "90px", fontSize: "13px", paddingTop: "2px"}}>Edit
                    </button>
                    <button className="btn btn-outline-danger mt-3" onClick={()=>deleteThread()}
                        style={{height: "26px", width: "90px", fontSize: "13px", paddingTop: "2px"}}>Delete
                    </button> 
                    </>
                  )
                } 
              })()}
            </Col>  
          </Row>
           <hr/>
          <Fade in={showForm} tag="h5" className="mt-3">
            {showForm&&renderForm()}    
          </Fade> 
          <Fade in={showEditForm} tag="h5" className="mt-3">  
            {showEditForm&&renderEditForm()}  
          </Fade>      
        </div>     
      )
  }

  const mapThreadPosts = () => {
    return thread.posts.map((post, i) => {
      return (
        <div key={'pos' + post._id}>
          <Row>
            <Col xs="12" sm="3">
              <p className="mb-0 text-success">Replied by</p>
              <h5 className="text-secondary pb-2">{post.author.username.toUpperCase()}</h5>
            </Col>
            <Col xs="12" sm="9">
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
    <Container className="themed-container">
      <animated.div style={props}>{thread && mapThreads()}</animated.div>
      <animated.div style={props}>{thread && mapThreadPosts()}</animated.div> 
    </Container>
  )
}

export default Thread