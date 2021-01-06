import React, { createContext, useState } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(null)

  const values = {
    loggedIn,
    setLoggedIn
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider