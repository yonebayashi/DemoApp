import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPhoto, addAlbum } from '../actions/index'
import { getPhotos, getAlbum } from '../utils/api'
import { get } from 'lodash'
import Header from '../components/Header'
import Photo from '../components/Photo'
import PageContainer from '../components/PageContainer'

class AlbumDetail extends Component {

  componentWillMount() {
    const id = parseInt(get(this.props, ['match', 'params', 'id']))
    getAlbum(id).then(album => this.props.addAlbum(album))

    getPhotos(id).then(photos => {
      photos.map(photo => this.props.addPhoto(photo))
    })
  }

  render() {
    const { album, photos } = this.props

    return (
      <PageContainer>
        {album ? <Header>Album: {album.title}</Header> : null}
        {photos.map(photo =>
          <Photo
            key={photo.id}
            photo={photo}
          />
        )}
      </PageContainer>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const photoIds = Object.keys(state.photos)
  const photos = photoIds.map(id => state.photos[id])

  const id = parseInt(get(ownProps, ['match', 'params', 'id']))
  const album = state.albums[id]
  console.log(state.albums)

  return {
    photos,
    album
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAlbum: (album) => dispatch(addAlbum(album)),
    addPhoto: (photo) => dispatch(addPhoto(photo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail)