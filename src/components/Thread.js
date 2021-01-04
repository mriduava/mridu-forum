import React, {useContext} from 'react'
import { ForumContext } from '../contexts/ForumContextProvider'
import {Card, CardTitle, CardText, CardBody, Col} from 'reactstrap';

const Thread = () => {
  const { articles } = useContext(ForumContext)

  const mapArticles = () => {
    return articles.map((article, i) => {
      return (
        <Col key={'art' + i + article.id}>
          <Card outline color="light">
            <CardBody>
              <CardTitle tag="h5">{article.title}</CardTitle>
              <CardText tag="h6" className="mb-2 text-muted">{article.text}</CardText>
            </CardBody>
          </Card> 
        </Col>
      )
    })
  }

  return (
    <div>
      {articles && mapArticles()}
    </div>
  )
}

export default Thread
