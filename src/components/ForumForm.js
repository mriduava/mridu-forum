import React, {useState, useEffect, useContext } from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Form, FormGroup, Input } from 'reactstrap';

const ForumForm = () => {
  const { fetchFroums} = useContext(ForumContext)
  const [forumSubject, setForumSubject] = useState('')
  const [forumDescription, setForumDescription] = useState('')
  const [message, setMessage] = useState()


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

  const createSubForum = async (e) => {
    e.preventDefault();
    await fetch(`/api/forums/`, {
      method: 'POST',
      body: JSON.stringify({
          subject: forumSubject, 
          description: forumDescription
        }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      fetchFroums()
      if (response.ok) {
        setMessage("Sub-Forum submission successful!") 
        setForumSubject('')
        setForumDescription('')      
      } else {
        setMessage("Sub-Forum submission failed!")
      }
    })
    .catch((error) => {
      return Promise.reject();
    });
  }



  return (
    <>
    <Form className="mt-3 mb-4" onSubmit={createSubForum}>
      <FormGroup>
        <Input type="select" name="select" id="exampleSelect" disabled>
         <option value ='' disabled>Select a Sub-Forum</option>
        </Input>  
      </FormGroup>
      <FormGroup>
        <Input type="text" name="topic" id="topic" placeholder="Write a forum subject.." 
          value={forumSubject} onChange={e=>setForumSubject(e.target.value)} required/>
      </FormGroup>     
      <FormGroup>
        <Input type="textarea" name="text" id="text" placeholder="Write forum description..." 
          value={forumDescription} onChange={e=>setForumDescription(e.target.value)} required/>
      </FormGroup>
      <button className="btn btn-outline-success mt-0" 
        style={{height: "26px", width: "190px", fontSize: "13px", paddingTop: "2px"}}>Submit Sub-Forum
      </button>
    </Form>
     {message&&displayAlert()}
     <hr/>
    </>
  )
}

export default ForumForm
