import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { Container, Row, Col, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import WritingForm from './WritingForm'
import MyThreads from './MyThreads'

const AdminPage = () => {
  const { user } = useContext(UserContext)
  const [showMyThreads, setShowMyThreads] = useState(true);
  const toggleMyThreads = () => setShowMyThreads(!showMyThreads);
  const [search, setSearch] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState('');
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [message, setMessage] = useState(null);

  const searchUser = async (e) => {
    e.preventDefault();    
    let user = await fetch(`/search/user?username=${search}&role=${search}`)
    user = await user.json();
    setFoundUser(user)
    setSearch('')
  }

  const dispUserInfo =() => {
    return foundUser.map((u, i) => {
      return (
        <div key={'sub' + u._id + i}>
          <hr/>
          <Row className="pt-2 found_user" style={{cursor: "pointer"}}
            onClick={()=>transferUserInfo(u.username, u.role)}>
            <Col xs="9" sm="8">  
              <h4 className="text-secondary mt-1 pb-0">{u.username}</h4>
              <p className="text-primary mt-0 pt-0">role: {u.role}</p>
            </Col>         
          </Row>
        </div>    
      )
    })
  }

  const transferUserInfo =(username, role) => {
    setUserName(username);
    setUserRole(role);
    setFoundUser(null);
    setSelectedRole(role);
  }

  const resetUserRole = async (e) => {
    e.preventDefault();    
    await fetch(`/api/users?username=${userName}`, {
      method: 'PUT',
      body: JSON.stringify({role:selectedRole}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        setUserName(null)
        setMessage('Role setting successful!')
      } else {
        setMessage("Role setting failed!")
      }
    })

  }

  const dispToModifyUser = ()=>{
    return(
      <>
      <div className="bg-success pt-2 pl-0 ml-0 mb-3 pb-0" style={{height: "40px", hover: {color: "white"} }} >
        <h5 className="pl-2 text-light pb-0">Modify User</h5>  
      </div>
      <Row className="pl-1">
        <Col xs="12" sm="12" lg="6">
          <h5>Username</h5>
          <div>
            <h2 className="text-info mt-2 p-0">{userName}</h2>
            <p className="text-success mt-0 pt-0">Present Role: {userRole}</p>
          </div>
          <button className="btn btn-outline-danger mt-3" 
              style={{height: "30px", width: "150px", fontSize: "16px", paddingTop: "2px"}}>Delete User
          </button>
        </Col>
        <Col xs="12" sm="12" lg="6" >
          <Form onSubmit={resetUserRole}>
            <h5 className="py-0">Set role</h5>
            <div className="form-check">
              <input type="radio" className="mt-2" value="admin" 
                checked={selectedRole === 'admin'? true: false}
                onChange={e=>setSelectedRole(e.target.value)}/>
              <label className="form-check-label pl-2">
                admin
              </label>
            </div>
            <div className="form-check">
              <input type="radio" className="mt-2" value="moderator" 
                checked={selectedRole === 'moderator'? true: false}
                onChange={e=>setSelectedRole(e.target.value)} />
              <label className="form-check-label pl-2">
                moderator
              </label>
            </div>
            <div className="form-check">
              <input type="radio" className="mt-2" value="general" 
                checked={selectedRole === 'general'? true: false}
                onChange={e=>setSelectedRole(e.target.value)} />
              <label className="form-check-label pl-2 mt-0">
                general
              </label>
            </div>
            <button className="btn btn-outline-success my-3" 
              style={{height: "30px", width: "150px", fontSize: "16px", paddingTop: "2px"}}>Set Role
            </button>
          </Form>
        </Col>
      </Row>
      <hr style={{height:"23px"}}/>
      </>
    )
  }

  const displayAlert = () => {
    return(
      <div className="alert alert-warning alert-dismissible fade show" role="alert">{message}</div>
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


  const renderModifyUser = () =>{
    return(
      <>
      <Row className="d-flex flex-column">
        <Col xs="12" sm="12" md="12" lg="12" className="pl-3 pt-0"> 
          <Form onSubmit={searchUser} className="d-flex">
            <FormGroup>
              <Input type="username" name="username" id="username" placeholder="Search user"
                className="border border-secondary" style={{height: "32px"}}
                value={search} onChange={e=>setSearch(e.target.value)} required/>
              <FormFeedback valid>Username is not correct!</FormFeedback>
            </FormGroup>
            <button className="btn btn-outline-secondary py-0" style={{height: "32px", width:"120px"}}>Search</button>
          </Form>
        </Col>
        <div style={{fontSize: "14px"}}>
          <p className="ml-3" >Searh user by username or role. </p>
          <p className="ml-3" style={{marginTop: "-15px"}}>To modify a user, click on the username.</p>
        </div>
      </Row>

      {foundUser&&dispUserInfo()}
      <hr/>
      {userName&&dispToModifyUser()}
      {message&&displayAlert()}
      </>
    )
  }

  return (
    <Container className="border border-warning pb-5" style={{minHeight:"80vh"}}>

      <Row className="d-flex flex-column">
        <Col xs="12" sm="12" md="12" lg="12" className="pl-3 pt-0"> 
          <h1 className="text-info font-weight-bold pt-5 ml-3">{user&&user.username.toUpperCase()}</h1>
          <h6 className="text-secondary ml-3">ROLE: <span className="text-success">{user&&user.role.toUpperCase()}</span></h6>
        </Col>
      </Row>
      <hr/>
      <Row className="mx-auto">
        <Col xs="12" sm="12" md="6" lg="6">
          <Row className="d-flex">
            <Col lg="12" className="d-flex justify-content-between">
                <button className="btn btn-outline-info m-0">Create a thread</button>
                <button className="btn btn-outline-info align-self-end ">Create a Sub-Forum</button>
            </Col>
          </Row>
     
          <hr className="ml-1"/>
          <WritingForm/>
        </Col>


         <Col xs="12" sm="12" md="6" lg="6">
            <Row className="d-flex">
              <Col lg="12" className="d-flex justify-content-between">
                <button className="btn btn-outline-info ml-lg-3" disabled={showMyThreads}
                  onClick={toggleMyThreads}>My Threads
                </button>
                <button className="btn btn-outline-info mr-0" disabled={!showMyThreads} 
                  onClick={toggleMyThreads}>Modify User</button>
              </Col>
            </Row>

           <hr className="ml-lg-3"/>

           <div className="ml-lg-3 mt-3">
              {showMyThreads?(
                <div>
                  <MyThreads/>
                </div>  
              ):(
                <div>
                  {renderModifyUser()}
                </div>
              )}
           </div>
        </Col>
      </Row>
      
    </Container>
  )
}

export default AdminPage
