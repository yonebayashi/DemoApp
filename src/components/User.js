import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap'

import '../styles.css'

class User extends Component {
  render() {
    const { user } = this.props
    return (
      <div className="user-card">
        <Card>
          <CardTitle>{user.name}</CardTitle>
          <CardSubtitle>@{user.username}</CardSubtitle>
          <CardBody>
            <Link to={`/${user.id}/posts`}>View posts</Link>{' '} | {' '}
            <Link to={`/${user.id}/albums`}>View albums</Link>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default User 