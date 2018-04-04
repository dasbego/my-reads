import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './shelf'
import * as BooksAPI from '../BooksAPI'
import { getAllShelvesNames } from '../utils'

class MyReads extends Component {
  state = {
    myShelves: [],
    myBooks: []
  }

  filterMyBooksByShelfName = (shelfName) => {
    return this.state.myBooks.filter(book => (book.shelf === shelfName))
  }

  onShelfChange = (event, selectedBook) => {
    const newShelf = event.currentTarget.value
    // get all books except the one selected
    const restOfBooks = this.state.myBooks.filter(book => (book.id !== selectedBook.id))
    
    // set book new status
    selectedBook.shelf = newShelf
    restOfBooks.push(selectedBook)
    this.setState({
      myBooks: restOfBooks
    })
    
    // API call will persist new book state for next time user reloads page
    this.persistBookChange(selectedBook, newShelf)
  }

  componentDidMount () {
	BooksAPI.getAll().then(books => {
   		const shelves = getAllShelvesNames(books)
    	this.setState({
    		myBooks: books,
		    myShelves: shelves
  		})
  	})
  }

  persistBookChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  render () {
    return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
          		{
          			this.state.myShelves.map((shelfName, idx, shelves) => {
          				const currentShelfBooks = this.filterMyBooksByShelfName(shelfName)
          				return (
          					<Shelf shelfName={shelfName} shelfBooks={currentShelfBooks}
                          		allShelvesNames={shelves} key={shelfName}
	                            onShelfChange={this.onShelfChange}>
                          </Shelf>
						)
					})
          		}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    )
  }
}

export default MyReads