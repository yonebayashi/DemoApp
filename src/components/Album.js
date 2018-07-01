import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardTitle } from 'reactstrap'

import '../styles.css'

class Album extends Component {
  render() {
    const { album } = this.props
    return (
      <Card className="post-card">
        <CardTitle>
          <Link to={`/albums/${album.id}`}>{album.title}</Link>
        </CardTitle>
      </Card>
    )
  }
}

export default Album 