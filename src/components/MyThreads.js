import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import { Row, Col } from 'reactstrap';

const MyThreads= () => {
  const { user } = useContext(UserContext)
  const { threads } = useContext(ForumContext)

  const mapThreads = () => {
    return threads.map((thread, i) => {
      return (
        <div key={'sub' + thread._id + i}>
           {(() => {
                if (user!==null && user.id === thread.author.id) {
                  return (
                    <>
                      <p>{i}. {thread.topic}</p>
                    </>
                  )
                }
              })()}
        </div>    
      )
    })
  }

  return ( 
    <Row>
      <Col lg="12">
      {threads&&mapThreads()}
      </Col>
    </Row>
  )
}

export default MyThreads
