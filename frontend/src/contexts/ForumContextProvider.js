import React, {createContext, useState, useEffect } from 'react'

export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [subjects, setSubjects] = useState()
  const [threads, setThreads] = useState()
  const [thread, setThread] = useState()
  const [subjectId, setSubjectId] = useState()
  const [threadId, setThreadId] = useState()
  const [subjectName, setSubjectName] = useState()

  //FETCH ALL SUB-FORUM FROM API
  const fetchFroums = async () => {
    let allSubjects = await fetch('/api/forums')
    allSubjects = await allSubjects.json();
    setSubjects(allSubjects)
  }

  //FETCH SUB-FORUM BY ID
  const fetchFroumById = async (_id, subjectName) => {
    let singleSubject = await fetch(`/api/forums/${_id}`);
    singleSubject = await singleSubject.json();
    setThreads(singleSubject.threads)
    setSubjectId(_id);
    setSubjectName(subjectName);
  }

  const fetchThreadById = async (_id1, _id2) => {
    let singleThread = await fetch(`/api/forums/${_id1}/${_id2}`)
    singleThread= await singleThread.json();
    setThread(singleThread);
    setThreadId(_id2);
  }

  useEffect(()=>{
    fetchFroums()
  }, [])

  const values = {
    fetchFroums,
    subjects,
    fetchFroumById,
    threads,
    fetchThreadById,
    thread,
    subjectId,
    subjectName,
    threadId
  }

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  )
}

export default ForumContextProvider
