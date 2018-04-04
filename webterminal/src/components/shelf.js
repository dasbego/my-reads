import React from 'react'
import Book from './book'
import pascalToCamelCase from '../utils'

const Shelf = ({shelfName, shelfBooks, allShelvesNames, onShelfChange}) => {

    const normalizedShelfTitle = pascalToCamelCase(shelfName)
 
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{normalizedShelfTitle}</h2>
			<div className="bookshelf-books">
		    	<ol className="books-grid">
                {
                  shelfBooks.map(book => (<li key={book.id}>
                      <Book bookInfo={book} allShelves={allShelvesNames} onShelfChange={onShelfChange}></Book>
                  </li>))
                }
      			</ol>
      		</div>
		</div>
    )
}
export default Shelf