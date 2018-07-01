import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Button } from 'reactstrap'
import { findIndex } from 'lodash'
import { deletePost } from '../actions/index'
import { removePost } from '../utils/api'
import EditPostForm from './EditPostForm'

import '../styles.css'


class Post extends Component {
  state = {
    showPost: true,
  }

  handleDelete = () => {
    removePost(this.props.post.id).then(() => this.props.deletePost(this.props.post))
    this.setState({ showPost: false })
    { this.props.redirect && this.props.redirect() }
  }

  render() {
    const { post } = this.props
    const { showPost } = this.state

    return (
      <div>
        {showPost ?
          <Card className="post-card">
            <CardTitle>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </CardTitle>
            <CardText>{post.body}</CardText>
            <div className="btn-group">
              <span>
                <EditPostForm post={post} />
              </span>
              <span>
                <Button color="danger" onClick={this.handleDelete}>Delete</Button>
              </span>
            </div>
          </Card> : null}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const index = findIndex(state.posts.items, item => item.id === ownProps.postId)
  const post = state.posts.items[index]

  return {
    post,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (post) => dispatch(deletePost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)