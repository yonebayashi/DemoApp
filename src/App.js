import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Posts from './containers/Posts'
import Albums from './containers/Albums'
import Dashboard from './containers/Dashboard'
import PostDetail from './containers/PostDetail'
import AlbumDetail from './containers/AlbumDetail'
import NotFound from './containers/NotFound'
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/:id' component={PostDetail} />
          <Route exact path='/:userId/posts' component={Posts} />
          <Route exact path='/:userId/albums' component={Albums} />
          <Route exact path='/albums/:id' component={AlbumDetail} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
