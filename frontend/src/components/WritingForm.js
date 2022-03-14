import React, {useContext, useState, useEffect } from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Form, FormGroup, Input } from 'reactstrap';

const WritingForm = () => {
  const { subjects } = useContext(ForumContext)
  const [subforumId, setSubforumId] = useState('')
  const [topic, setTopic] = useState('')
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const mapSubjects = () => {
    return(
      <Input type="select" name="select" id="exampleSelect" required
        onChange={e=>setSubforumId(e.target.value)}>
         <option value =''>Select a Sub-Forum</option>
         {(() => {
          return subjects.map((subject, i) => {
            return (
              <option key={'sub' + subject._id + i} 
                value={subject._id}>
                {subject.subject}
              </option>
            )
          })
        })()}
      </Input>
    )
  }

  const displayAlert = () => {
    return(
      <div className="alert alert-success alert-dismissible fade show" role="alert">{message}</div>
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message!==null) {
        setMessage(null)
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const createThread = async (e) => {
    e.preventDefault();
    await fetch(`/api/forums/${subforumId}`, {
      method: 'POST',
      body: JSON.stringify({topic, text}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        setMessage("Thread submission successful!") 
        setSubforumId('')
        setTopic('')
        setText('')      
      } else {
        setMessage("Thread submission failed!")
      }
    })
    .catch((error) => {
      return Promise.reject();
    });
  }

  return (
    <>
    <Form className="mt-3 mb-4" onSubmit={createThread}>
      <FormGroup>
        {subjects&&mapSubjects()}   
      </FormGroup>
      <FormGroup>
        <Input type="text" name="topic" id="topic" placeholder="Write a title..." 
          minLength="6" value={topic} onChange={e=>setTopic(e.target.value)} required/>
      </FormGroup>     
      <FormGroup>
        <Input type="textarea" name="text" id="text" placeholder="Write in detail..." 
          minLength="15" value={text} onChange={e=>setText(e.target.value)} required/>
      </FormGroup>
      <button className="btn btn-outline-success mt-0" 
        style={{height: "26px", width: "190px", fontSize: "13px", paddingTop: "2px"}}>Submit Thread
      </button>
    </Form>
      {message&&displayAlert()}
      <hr/>
    </>
  )
}

export default WritingForm
