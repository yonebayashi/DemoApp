import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAlbum } from '../actions/index'
import { getAlbums } from '../utils/api'
import Album from '../components/Album'
import Header from '../components/Header'
import PageContainer from '../components/PageContainer'
import { get } from 'lodash'

class Albums extends Component {

  componentDidMount() {
    const userId = get(this.props, ['match', 'params', 'userId'])
    getAlbums(userId).then(albums => {
      albums.map(album => this.props.addAlbum(album))
    })
  }

  render() {
    const { albums } = this.props

    return (
      <PageContainer>
        <Header>Albums</Header>
        {albums.map(album =>
          <Album
            key={album.id}
            album={album}
          />
        )}
      </PageContainer>
    )
  }
}

function mapStateToProps(state) {
  const albumIds = Object.keys(state.albums)
  const albums = albumIds.map(id => state.albums[id])

  return {
    albums
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAlbum: (album) => dispatch(addAlbum(album))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)