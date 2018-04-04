import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './book'
import { getAllShelvesNames } from '../utils'

class SearchPage extends Component {
  state = {
    searchQuery: '',
    foundBooks: [],
    myShelves: [],
    myBooks: []
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

  onSearchInputUpdate = (event) => {
    this.setState({ searchQuery: event.target.value }, this.searchQuery)
  }

  searchQuery = () => {
    const MAX_RESULTS = 50
    if (this.state.searchQuery !== "") {
    	BooksAPI.search(this.state.searchQuery, MAX_RESULTS)
      		.then(this.showFoundBooks)
      		.catch(this.resetSearch)
    } else {
      this.resetSearch()
    }
  }

  resetSearch = () => {
    this.setState({ foundBooks: [] })
  }

  showFoundBooks = (response) => {
    const updatedBooks = this.updateSearchWithMyBooks(response)
    this.setState({ foundBooks: updatedBooks })
  }

  updateSearchWithMyBooks  = (foundBooks) => {
    return foundBooks.map(foundBook => {
      for (let idx = 0; idx < this.state.myBooks.length; idx++) {
        if (this.state.myBooks[idx].id === foundBook.id) {
          foundBook.shelf = this.state.myBooks[idx].shelf
        }
      }
      return foundBook
    })
  }

  onShelfChange = (event, selectedBook) => {
    const newShelf = event.currentTarget.value
    const restOfBooks = this.state.foundBooks.filter(book => (book.id !== selectedBook.id))
    
    // set book new status
    selectedBook.shelf = newShelf
    restOfBooks.push(selectedBook)
    this.setState({
      myBooks: restOfBooks
    })
	BooksAPI.update(selectedBook, newShelf)
  }

  render () {
    return (
		<div className="search-books">
		<div className="search-books-bar">
		<Link className="close-search" to="/">Close</Link>
		<div className="search-books-input-wrapper">
		{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
				<input type="text" placeholder="Search by title or author" onChange={this.onSearchInputUpdate}/>
			</div>
		</div>
		<div className="search-books-results">
			<ol className="books-grid">
         {
         	this.state.foundBooks.map((book) => {
    			return (
    				<li key={book.id}>
						<Book bookInfo={book} allShelves={this.state.myShelves}
						onShelfChange={this.onShelfChange}/>
					</li>
				)
  			})
         }
         	</ol>
		</div>
	</div>
	)}
}

export default SearchPage