import React from 'react'
import pascalToCamelCase from '../utils'

const Book = (props) => {
  const shelvesNames = props.allShelves.map(
    shelfName => ({
      pascal: shelfName,
      normal: pascalToCamelCase(shelfName)
    })
  )
  
  const getBookShelf = (bookShelf) => {
    return bookShelf ? bookShelf : 'none'
  }
  
  return (
    <div className="book">
      <div className="book-top">
      	<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.bookInfo.imageLinks ? props.bookInfo.imageLinks.thumbnail : ''})`}}></div>
      	<div className="book-shelf-changer">
          <select onChange={(event) => props.onShelfChange(event, props.bookInfo)} value={getBookShelf(props.bookInfo.shelf)}>
           <option value="default" disabled>Move to...</option>
			{
				shelvesNames.map(shelfName => (
					<option value={shelfName.pascal} key={shelfName.pascal}>{shelfName.normal}</option>
				))
			}
            <option value="none">None</option>
          </select>
      	</div>
      </div>
      <div className="book-title">{props.bookInfo.title}</div>
      <div className="book-authors">{props.bookInfo.authors}</div>
    </div>
  );
};

export default Book;
