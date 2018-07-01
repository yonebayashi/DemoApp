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
  FETCH_COMMENTS_FAILURE,
} from './types'

import { getPosts, getComments } from '../utils/api'

/**
 * Users
 */

export const addUser = (user) => ({ type: ADD_USER, user })

/**
 * Posts
 */

export const fetchPosts = () => {
  return dispatch => {
    dispatch({ type: FETCH_POSTS })
    return getPosts().then(
      posts => {
        dispatch(fetchPostsSuccess(posts))
      },
      error => dispatch(fetchPostsFailure(error))
    )
  }
}
export const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, posts })
export const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, error })

export const addPost = (post) => ({ type: ADD_POST, post })
export const editPost = (post) => ({ type: EDIT_POST, post })
export const deletePost = (post) => ({ type: DELETE_POST, post })

/**
 * Comments
 */

export const fetchComments = (postId) => {
  return dispatch => {
    dispatch({ type: FETCH_COMMENTS })
    return getComments(postId).then(
      comments => {
        dispatch(fetchCommentsSuccess(comments))
      },
      error => dispatch(fetchCommentsFailure(error))
    )
  }
}
export const fetchCommentsSuccess = (comments) => ({ type: FETCH_COMMENTS_SUCCESS, comments })
export const fetchCommentsFailure = (error) => ({ type: FETCH_COMMENTS_FAILURE, error })

export const addComment = (comment) => ({ type: ADD_COMMENT, comment })
export const editComment = (comment) => ({ type: EDIT_COMMENT, comment })
export const deleteComment = (comment) => ({ type: DELETE_COMMENT, comment })

/**
 * Albums
 */

export const addAlbum = (album) => ({ type: ADD_ALBUM, album })

/**
 * Photos
 */

export const addPhoto = (photo) => ({ type: ADD_PHOTO, photo })
