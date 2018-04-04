// function to transform a pascal case text to camel case separated by spaces
// useful to transform book shelf status into shelf title text
// Code block taken from and credits to https://stackoverflow.com/questions/26188882/split-pascal-case-in-javascript-certain-case?answertab=votes#tab-top
// Works as a fast solution for the occasion
const pascalToCamelCase = (text) => {
  return text
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, '$1 $2')
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      .replace(/^./, function(str){ return str.toUpperCase(); })
      // Remove any white space left around the word
      .trim()
}

export const getAllShelvesNames = (books) => {
  let shelvesNames = []
  books.forEach(book => {
    if (shelvesNames.indexOf(book.shelf) === -1) {
      shelvesNames.push(book.shelf)
    }
  })
  return shelvesNames
}

export default pascalToCamelCase
