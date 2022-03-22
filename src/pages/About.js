import React from 'react'
import { Container } from 'reactstrap';
import { useSpring, animated } from 'react-spring'

const About = () => {
  const animate = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
  return (
    <Container style={{textAlign:'center'}} className="border border-secondary pb-5">
      <animated.div style={animate}>
        <h1 style={{marginTop: '10%'}}>THIS IS A DEMO WEB SITE</h1>
      </animated.div>
    </Container>
  )
}

export default About
