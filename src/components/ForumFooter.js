import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";


const ForumFooter = () => {
  return (
    <div className="footer bottom">
    <Container className="rounded-top mt-2">
      <Row>
        <Col lg="12" className="px-0">
          <div className="footer-bar"></div>
        </Col>
      </Row>
      <Row className="footer-top">        
        <Col lg="4" className="pt-3">
          <p className="mb-0 font-weight-bold text-primary">CONTACT</p>
          <hr className="my-0 bg-secondary"/>
          <p className="mb-0 font-weight-bold">MARUF AHMED</p>
          <p className="mb-0"><span>Email: </span> mriduava@gmail.com</p>
          <p><span>GitHub :</span> github.com/mriduava/mridu-forum</p>
        </Col>
        <Col lg="4" className="pt-3 text-lg-center">
          <p className="mb-0 font-weight-bold text-primary">MEDIA ICONS</p>
          <hr className="my-0 bg-secondary"/>
          <div className="d-flex justify-content-center">
            <h4 className="mt-3 mr-1"><FontAwesomeIcon icon={faBrain} /></h4>
            <h4 className="mt-3 mx-1"><FontAwesomeIcon icon={faCalendarDay} /></h4>
          </div>   
        </Col>
        <Col lg="4" className="text-lg-right pt-3">
          <p className="mb-0 font-weight-bold text-primary">USEFUL LINK</p>
          <hr className="my-0 bg-secondary"/>
          <Link className="text-dark" to="/signin">
            <p className="mb-0">SIGN IN</p>
          </Link>
          <Link className="text-dark" to="/register">
            <p className="mb-0">REGISTER</p>
          </Link>
          <Link className="text-dark" to="/about">
            <p className="mb-0">ABOUT</p>
          </Link>
        </Col>
      </Row>
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
