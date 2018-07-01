import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get, findIndex } from 'lodash'
import { addPost, fetchComments } from '../actions/index'
import { getPost } from '../utils/api'
import Post from '../components/Post'
import Comment from '../components/Comment'
import AddCommentForm from '../components/AddCommentForm'
import Spinner from 'react-spinkit'
import Header from '../components/Header'
import PageContainer from '../components/PageContainer'

import '../styles.css'

class PostDetail extends Component {

  componentDidMount() {
    const id = parseInt(get(this.props, ['match', 'params', 'id']))

    getPost(id).then(post => this.props.addPost(post))
    this.props.fetchComments(id)
  }

  redirect = () => {
    this.props.history.push('/404')
  }

  render() {
    const { post, comments, isFetching } = this.props

    return (
      <PageContainer>
        <Header>Post Detail</Header>
        {post && (
          <div>
            <Post postId={post.id} redirect={this.redirect} />

            <AddCommentForm postId={post.id} />

            {!isFetching ?
              <div className="comments-container">
                <strong style={{ margin: '5px' }}>Comments</strong>

                {comments.map(comment =>
                  <Comment
                    key={comment.id}
                    comment={comment}
                  />
                )}
              </div>
              : <Spinner name="pulse" color="red" className="spinner" />}
          </div>
        )}
      </PageContainer>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const postId = parseInt(get(ownProps, ['match', 'params', 'id']))
  const index = findIndex(state.posts.items, item => item.id === postId)
  const post = state.posts.items[index]

  const comments = state.comments.items.filter(comment => comment.deleted !== true)
  const isFetching = state.comments.isFetching

  return {
    post,
    comments,
    isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post)),
    fetchComments: (postId) => dispatch(fetchComments(postId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail))