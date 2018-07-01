import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardText, Button } from 'reactstrap'
import EditCommentForm from './EditCommentForm'
import { removeComment } from '../utils/api'
import { deleteComment } from '../actions'

import '../styles.css'

class Comment extends Component {
  state = {
    showComment: true
  }

  handleDelele = () => {
    removeComment(this.props.comment.id).then(() => this.props.deleteComment(this.props.comment))
    this.setState({ showComment: false })
  }

  render() {
    const { comment } = this.props
    const { showComment } = this.state

    return (
      <div>
        {showComment ?
          <Card className="post-card">
            <span><strong>{comment.name}</strong> said: </span>
            <CardText>{comment.body}</CardText>

            <div className="btn-group">
              <span>
                <EditCommentForm comment={comment} />
              </span>
              <span>
                <Button color="danger" onClick={this.handleDelele}>Delete</Button>
              </span>
            </div>
          </Card> : null}
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (comment) => dispatch(deleteComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(Comment)