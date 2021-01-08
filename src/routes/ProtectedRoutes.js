import React, {useContext} from 'react'
import MyPage from '../pages/MyPage'
import ModeratorPage from '../components/Admin'
import GeneralPage from '../components/Admin'
import { UserContext } from '../contexts/UserContextProvider'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoutes = (props) => {
  const { user } = useContext(UserContext);

  // let user = userStatus.user
  // user = user || { roles: [] }
  let admin = user.role;

  return (
    <>
      <Route path='/mypage'
        render={()=>(user.role ==='admin'?(<MyPage/>):(<Redirect to="/"/>))}
      />
      {/* <Route path='/moderator'
        render={()=>(moderator?(<ModeratorPage/>):(<Redirect to="/"/>))}
      />
      <Route path='/general'
        render={()=>(general?(<GeneralPage/>):(<Redirect to="/"/>))}
      /> */}
    </>
  )
}

export default ProtectedRoutes