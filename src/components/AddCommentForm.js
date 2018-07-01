import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form, FormGroup, Label, Input,
} from 'reactstrap'
import { addComment } from '../actions/index'
import { createComment } from '../utils/api'

import '../styles.css'

class AddCommentForm extends Component {
  state = {
    openModal: false,
    body: ''
  }

  toggle = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const commentParams = {
      postId: this.props.postId,
      id: Math.random().toString(36).substr(-8),
      name: 'Elizabeth Jane',
      email: 'elizabeth.jane@gmail.com',
      body: this.state.body,
    }
    createComment(commentParams).then(comment => this.props.addComment(comment))
    this.toggle()
  }

  render() {
    return (
      <div className="add-comment">
        <Button onClick={this.toggle}>Add comment</Button>
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggle}
        >
          <ModalHeader>New comment</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Body</Label>{' '}
                <Input
                  name="text"
                  onChange={(e) => this.setState({ body: e.target.value })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.handleSubmit}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(AddCommentForm)