import React, {createContext, useState, useEffect } from 'react'

export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [subjects, setSubjects] = useState()
  const [threads, setThreads] = useState()

  //FETCH ALL SUB-FORUM FROM API
  const fetchFroums = async () => {
    let allSubjects = await fetch('/api/forums')
    allSubjects = await allSubjects.json();
    setSubjects(allSubjects)
  }

  //FETCH SUB-FORUM BY ID
  const fetchFroumById = async (_id) => {
    let singleSubject = await fetch(`/api/forums/${_id}`)
    singleSubject = await singleSubject.json();
    setThreads(singleSubject.threads)
  }

  useEffect(()=>{
    fetchFroums()
  }, [])

  const values = {
    subjects,
    fetchFroumById,
    threads
  }

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  )
}

export default ForumContextProvider
