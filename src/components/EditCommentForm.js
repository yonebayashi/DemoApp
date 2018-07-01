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
import { editComment } from '../actions/index'
import { updateComment } from '../utils/api'

class EditCommentForm extends Component {
  state = {
    openModal: false,
    body: ''
  }

  componentDidMount() {
    const { comment } = this.props
    this.setState({ body: comment.body })
  }

  toggle = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const commentParams = { body: this.state.body }
    updateComment(this.props.comment.id, commentParams).then(comment => this.props.editComment(comment))

    this.toggle()
  }

  render() {
    const { comment } = this.props

    return (
      <div>
        <Button onClick={this.toggle}>Edit</Button>
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggle}
        >
          <ModalHeader>Edit comment</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Body</Label>{' '}
                <Input
                  name="text"
                  onChange={(e) => this.setState({ body: e.target.value })}
                  defaultValue={comment.body} />
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
    editComment: (comment) => dispatch(editComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(EditCommentForm)