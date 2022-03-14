import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";
import { Container, Row, Col} from 'reactstrap'
library.add(fab)

const ForumFooter = () => {
  return (
    <div className="footer">
      <Container className="bottom footer-bar" fluid>
        <Row>
          <Col lg="12" className="px-0">
            <div className="footer-bar"></div>
          </Col>
        </Row>
      </Container>
      <div className="footer-top">
      <Container className="px-lg-0">
        <Row className="">      
          <Col lg="4" className="pt-3">
            <p className="mb-0 font-weight-bold text-priamry">CONTACT</p>
            <hr className="my-0 bg-secondary"/>
            <p className="mb-0"><span className="text-white">MARUF AHMED</span></p>
            <p className="mb-0 "><span className="text-white">Email: </span><span className="text-white">maruf.ahmed@live.se</span></p>
            <p><span  className="text-white">GitHub :</span><span className="text-white"> github.com/mriduava/mridu-forum</span></p>
          </Col>
          <Col lg="4" className="pt-3 text-lg-center">
            <p className="mb-0 font-weight-bold text-priamry">MEDIA ICONS</p>
            <hr className="my-0 bg-secondary"/>
            <div className="d-flex justify-content-center">
              <h4 className="mt-3 mr-1">
                <span className="text-white"><FontAwesomeIcon icon={["fab", "linkedin"]} /></span>
              </h4>
              <h4 className="mt-3 mx-1">
                <span className="text-white"><FontAwesomeIcon icon={["fab", "facebook"]} /></span>
              </h4>
              <h4 className="mt-3 mx-1">
                <span className="text-white"><FontAwesomeIcon icon={["fab", "github"]} /></span>
              </h4>
            </div>   
          </Col>
          <Col lg="4" className="text-lg-right pt-3">
            <p className="mb-0 font-weight-bold text-priamry">USEFUL LINK</p>
            <hr className="my-0 bg-secondary"/>
            <Link className="text-dark" to="/signin">
              <p className="mb-0"><span className="text-white">SIGN IN</span></p>
            </Link>
            <Link className="text-dark" to="/register">
              <p className="mb-0"><span className="text-white">REGISTER</span></p>
            </Link>
            <Link className="text-dark" to="/about">
              <p className="mb-0"><span className="text-white">ABOUT</span></p>
            </Link>
          </Col>
        </Row>
      </Container>
      </div>
      <Container fluid>
        <Row>
          <Col lg="12" className="footer-bottom">
            <div style={{height: "30px"}}>
              <p className="mb-0">&copy; 2021 MARUF AHMED</p>
            </div>
          </Col>
        </Row>
      </Container> 
    </div>
  )
}

export default ForumFooter
