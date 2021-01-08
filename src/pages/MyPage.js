import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import AdminPage from '../components/Admin'
import GeneralPage from '../components/General'

const MyPage = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
    {user?
    ( <AdminPage/>):(
      <GeneralPage/>
    ) }
    
      
    </div>
  )
}

export default MyPage
