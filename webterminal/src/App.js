import React from 'react'
import './App.css'
import SearchPage from './components/search'
import MyReads from './components/myreads'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
       <Route path="/search" exact component={SearchPage} />
       <Route path="/" exact component={MyReads} />
      </div>
    )
  }
}

export default BooksApp
