import React, {createContext, useState, useEffect } from 'react'

export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [subjects, setSubjects] = useState()

  //FETCH ALL FORUM ARTICLES FROM API
  const fetchFroums = async () => {
    let allSubjects = await fetch('/api/forums')
    allSubjects = await allSubjects.json();
    setSubjects(allSubjects)
  }

  useEffect(()=>{
    fetchFroums()
  }, [])

  const values = {
    fetchFroums,
    subjects
  }

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  )
}

export default ForumContextProvider
