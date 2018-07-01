const api = "https://jsonplaceholder.typicode.com"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * Users
 */

export const getUsers = () =>
  fetch(`${api}/users`, { headers })
    .then(res => res.json())

export const getUser = (id) =>
  fetch(`${api}/users/${id}`, { headers })
    .then(res => res.json())


/**
 * Posts 
 */

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())


export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())


export const createPost = (postParams) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    body: JSON.stringify(postParams),
    headers: {
      ...headers,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())


export const updatePost = (id, postParams) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(postParams),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())


export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })

/**
 * Comments 
 */

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())


export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())


export const createComment = (commentParams) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentParams),
    headers: {
      ...headers,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())


export const updateComment = (id, commentParams) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(commentParams),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())


export const removeComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })

/**
 * Albums
 */

export const getAlbums = (userId) =>
  fetch(`${api}/users/${userId}/albums`, { headers })
    .then(res => res.json())


export const getAlbum = (id) =>
  fetch(`${api}/albums/${id}`, { headers })
    .then(res => res.json())


/**
 * Photos
 */

export const getPhotos = (albumId) =>
  fetch(`${api}/albums/${albumId}/photos`, { headers })
    .then(res => res.json())


export const getPhoto = (photo) =>
  fetch(`${api}/albums/${photo.albumId}/photos/${photo.id}`, { headers })
    .then(res => res.json())
