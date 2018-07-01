import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../actions/index'
import { getUsers } from '../utils/api'
import User from '../components/User'
import Header from '../components/Header'
import PageContainer from '../components/PageContainer'

import '../styles.css'

class Dashboard extends Component {

  componentWillMount() {
    getUsers().then(users => {
      users.map(user => this.props.addUser(user))
    })
  }

  render() {
    const { users } = this.props

    return (
      <PageContainer>
        <Header>Dashboard</Header>
        {users.map(user => (
          <User
            key={user.id}
            user={user}
          />
        ))}
      </PageContainer>
    )
  }
}

function mapStateToProps(state) {
  const userIds = Object.keys(state.users)
  const users = userIds.map(id => state.users[id])

  return {
    users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (user) => dispatch(addUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)