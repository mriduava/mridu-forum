import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Form, FormGroup, Input, FormFeedback } from 'reactstrap';

const AdminPage = () => {
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState('');
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [message, setMessage] = useState(null);

  const searchUser = async (e) => {
    e.preventDefault();    
    let user = await fetch(`/search/user?username=${search}&role=${search}`)
    user = await user.json();
    setUser(user)
    setSearch('')
  }

  const dispUserInfo =() => {
    return user.map((u, i) => {
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
    setUser(null);
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
        <Col lg="3">
          <h5>Username</h5>
          <div>
            <h2 className="text-info mt-2 p-0">{userName}</h2>
            <p className="text-success mt-0 pt-0">Present Role: {userRole}</p>
          </div>
          <button className="btn btn-outline-danger mt-3" 
              style={{height: "30px", width: "150px", fontSize: "16px", paddingTop: "2px"}}>Delete User
          </button>
        </Col>
        <Col lg="9">
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

  return (
     <Container className="border border-warning pb-5" style={{minHeight:"80vh"}}>
      <h4 className="text-dark font-weight-bold pt-5">ADMIN</h4>
      <hr/>
      <Row className="d-flex flex-column">
        <Col xs="12" sm="8" md="6" lg="5" className="pl-3 pt-0"> 
          <Form onSubmit={searchUser} className="d-flex">
            <FormGroup>
              <Input type="username" name="username" id="username" placeholder="Search user"
                className="border border-secondary" style={{height: "32px"}}
                value={search} onChange={e=>setSearch(e.target.value)} required/>
              <FormFeedback valid>Username is not correct!</FormFeedback>
            </FormGroup>
            <button className="btn btn-outline-secondary py-0" style={{height: "32px"}}>Search</button>
          </Form>
        </Col>
        <div style={{fontSize: "14px"}}>
          <p className="ml-3" >Searh user by username or role. </p>
          <p className="ml-3" style={{marginTop: "-15px"}}>To modify a user, click on the username.</p>
        </div>
      </Row>

      {user&&dispUserInfo()}
      <hr/>
      {userName&&dispToModifyUser()}
      {message&&displayAlert()}
    </Container>
  )
}

export default AdminPage
