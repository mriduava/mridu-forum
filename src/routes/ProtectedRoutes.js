import React, {useContext} from 'react'
import MyPage from '../pages/MyPage'
import { UserContext } from '../contexts/UserContextProvider'
import {Route, Redirect, Switch} from 'react-router-dom'

const ProtectedRoutes = (props) => {
  const { user } = useContext(UserContext);

  return (
    <Route path='/mypage'
      render={()=>(user!==null?(<MyPage/>):(<Redirect to="/"/>))}
    />
  )
}

export default ProtectedRoutes