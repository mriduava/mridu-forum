import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    console.log(user);
  },[user])

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