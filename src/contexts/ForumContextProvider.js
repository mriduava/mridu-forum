import React, {createContext, useState, useEffect } from 'react'

export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [articles, setArticles] = useState()

  //FETCH ALL FORUM ARTICLES FROM API
  const fetchFroumArticles = async () => {
    let allArticles = await fetch('/api/forum')
    allArticles = await allArticles.json();
    setArticles(allArticles)
  }

    useEffect(()=>{
    fetchFroumArticles()
  }, [])

  const values = {
    fetchFroumArticles,
    articles
  }

  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  )
}

export default ForumContextProvider
