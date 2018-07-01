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
import { addPost } from '../actions/index'
import { createPost } from '../utils/api'

import '../styles.css'

class AddPostForm extends Component {
  state = {
    openModal: false,
    title: '',
    body: ''
  }

  toggle = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const postParams = {
      userId: this.props.userId,
      id: Math.random().toString(36).substr(-8),
      title: this.state.title,
      body: this.state.body,
    }
    createPost(postParams).then(post => this.props.addPost(post))
    this.toggle()
  }

  render() {
    return (
      <div className="add-post">
        <Button onClick={this.toggle}>Add post</Button>
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggle}
        >
          <ModalHeader>New post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Title</Label>{' '}
                <Input
                  name="text"
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </FormGroup>
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
    addPost: (post) => dispatch(addPost(post))
  }
}

export default connect(null, mapDispatchToProps)(AddPostForm)