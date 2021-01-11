import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(()=>{
    if (token) {
      setUser(token)
    }
  },[])

  const values = {
    user,
    setUser
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider