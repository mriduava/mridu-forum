import React, {useContext, useEffect} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { Form, FormGroup, Input } from 'reactstrap';

const WritingForm = () => {
  const { subjects } = useContext(ForumContext)

  const mapSubjects = () => {
    return subjects.map((subject, i) => {
      return (
        <option key={'sub' + subject._id + i}>{subject.subject}</option>
      )
    })
  }

  useEffect(()=>{
    mapSubjects()
  }, [])

  return ( 
    <Form className="mt-3 mb-4">
      <FormGroup>
        <p className="py-0 m-0 text-secondary" style={{fontSize: "14px"}}>Select a sub-forum</p>
        <Input type="select" name="select" id="exampleSelect" required>
          {subjects&&mapSubjects()}
        </Input>
      </FormGroup>
      <FormGroup>
        <Input type="text" name="topic" id="topic" placeholder="Write a title..."  required/>
      </FormGroup>     
      <FormGroup>
        <Input type="textarea" name="text" id="text" placeholder="Write in detail..." required/>
      </FormGroup>
      <button className="btn btn-outline-success mt-0" 
        style={{height: "26px", width: "120px", fontSize: "13px", paddingTop: "2px"}}>Submit
      </button>
    </Form>
  )
}

export default WritingForm
