import React from 'react'
import { Container, Row } from 'reactstrap'

const ForumFooter = () => {
  return (
    <div className="footer bottom">
    <Container className="bg-warning bg-gradient rounded-top mt-2">
      <Row>        
        <div className="mx-auto pt-3">
          <p className="mb-0 font-weight-bold">&copy; 2021 MARUF AHMED</p>
          <hr className="my-0 bg-secondary"/>
          <p className="mb-0">email: mriduava@gmail.com</p>
          <p>github.com/mriduava/mridu-forum</p>
        </div>
      </Row>      
    </Container>
    </div>
  )
}

export default ForumFooter
