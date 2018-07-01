import { combineReducers } from 'redux'
import {
  ADD_USER,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  ADD_ALBUM,
  ADD_PHOTO,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE
} from '../actions/types'
import { findIndex } from 'lodash'

const users = (state = {}, action) => {
  const { user } = action
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        [user.id]: user
      }
    default:
      return state
  }
}

const posts = (
  state = {
    isFetching: false,
    items: []
  }, action) => {

  const { post } = action
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case ADD_POST:
      return {
        ...state,
        items: [
          post,
          ...state.items,
        ]
      }
    case EDIT_POST:
      const index = findIndex(state.items, item => item.id === post.id)
      return {
        ...state,
        items: Object.assign(state.items, [], { [index]: post })
      }
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter(item => item.id !== post.id)
      }
    default:
      return state
  }
}

const comments = (
  state = {
    isFetching: false,
    items: []
  }, action) => {

  const { comment } = action
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.comments
      }
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        items: [
          comment,
          ...state.items,
        ]
      }
    case EDIT_COMMENT:
      const index = findIndex(state.items, item => item.id === comment.id)
      return {
        ...state,
        items: Object.assign(state.items, [], { [index]: comment })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        items: state.items.filter(item => item.id !== comment.id)
      }
    default:
      return state
  }
}

const albums = (state = {}, action) => {
  const { album } = action
  switch (action.type) {
    case ADD_ALBUM:
      return {
        ...state,
        [album.id]: album
      }
    default:
      return state
  }
}

const photos = (state = {}, action) => {
  const { photo } = action
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...state,
        [photo.id]: photo
      }
    default:
      return state
  }
}

export default combineReducers({
  users,
  posts,
  comments,
  albums,
  photos,
})