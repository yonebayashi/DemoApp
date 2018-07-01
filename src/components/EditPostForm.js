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
import { editPost } from '../actions/index'
import { updatePost } from '../utils/api'

class EditPostForm extends Component {
  state = {
    openModal: false,
    title: '',
    body: ''
  }

  componentDidMount() {
    const { post } = this.props
    this.setState({ title: post.title, body: post.body })
  }

  toggle = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const postParams = {
      title: this.state.title,
      body: this.state.body,
    }

    updatePost(this.props.post.id, postParams).then(post => this.props.editPost(post))

    this.toggle()
  }

  render() {
    const { post } = this.props

    return (
      <div>
        <Button onClick={this.toggle}>Edit</Button>
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggle}
        >
          <ModalHeader>Edit post</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Title</Label>{' '}
                <Input
                  name="text"
                  onChange={(e) => this.setState({ title: e.target.value })}
                  defaultValue={post.title} />
              </FormGroup>
              <FormGroup>
                <Label>Body</Label>{' '}
                <Input
                  name="text"
                  onChange={(e) => this.setState({ body: e.target.value })}
                  defaultValue={post.body} />
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
    editPost: (post) => dispatch(editPost(post))
  }
}

export default connect(null, mapDispatchToProps)(EditPostForm)