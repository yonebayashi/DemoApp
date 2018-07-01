import React, { Component } from 'react'
import { Card, CardTitle } from 'reactstrap'

import '../styles.css'

class Photo extends Component {
  render() {
    const { photo } = this.props
    return (
      <Card className="photo-card">
        <img
          src={photo.thumbnailUrl}
          alt="thumbnail"
          className="photo-img"
        />
        <CardTitle className="photo-card-title">{photo.title}</CardTitle>
      </Card>
    )
  }
}

export default Photo 