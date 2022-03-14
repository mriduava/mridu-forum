import React, {useContext} from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import AdminPage from '../components/Admin'
import ModeratorPage from '../components/Moderator'
import GeneralPage from '../components/General'

const MyPage = () => {
  const { user } = useContext(UserContext)

  return (
    <>
    {(() => {
        if (user!==null && user.role==='admin') {
          return (
            <><AdminPage/></>
          )
        } else if (user!==null && user.role==='moderator') {
          return (
            <><ModeratorPage/></>
          )
        } else {
          return (
            <><GeneralPage/></>
          )
        }
      })()}
    </>
  )
}

export default MyPage
