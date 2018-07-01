import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, fetchPosts } from '../actions/index'
import Post from '../components/Post'
import { get } from 'lodash'
import AddPostForm from '../components/AddPostForm'
import Spinner from 'react-spinkit'
import Header from '../components/Header'
import PageContainer from '../components/PageContainer'

import '../styles.css'

class Posts extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { userId, postsByUser, isFetching } = this.props

    return (
      <PageContainer>
        <Header>Posts</Header>

        <AddPostForm userId={userId} />

        {!isFetching ? (
          <div>
            {postsByUser.map(post =>
              <Post
                key={post.id}
                postId={post.id}
              />
            )}
          </div>
        ) : <Spinner name="pulse" color="red" className="spinner" />}
      </PageContainer>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // get all posts
  const posts = state.posts.items

  // filter posts by userId
  const userId = parseInt(get(ownProps, ['match', 'params', 'userId']))
  const postsByUser = posts.filter(post => post.userId === userId)

  const isFetching = state.posts.isFetching

  return {
    posts,
    userId,
    postsByUser,
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    addPost: (post) => dispatch(addPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)