import { BookWithReviews } from "./model";

/**
 * Parses passed books and reviews arrays to create an array of BookWithReviews object. Each row from books input array
 * should have a corresponding row in resulting array. For example, for following input data:
 *    books = [ { "id" : 101, "title" : "Some book title" } ]
 *    reviews = [ { "bookId" : 101, "author" : "John", "content" : "Great book!" } ];
 * It should return following result:
 *    result = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 *
 * @param books - an array of input books, see 'src/app/dataset/books.json' for sample data.
 * @param reviews - an array of input reviews, see 'src/app/dataset/reviews.json' for sample data.
 * @returns {Array} - an array of BookWithReviews objects
 */
export function parseBooksData(books, reviews) {
    let _return = [];
    let booksWithReviews = books.map(book =>  {
    let match = reviews.filter(review => review.bookId == book.id);
    let _book = new BookWithReviews(book.id, book.title);
    if(match.length) { 
      for(const r of match){
        _book.addReview(r.author, r.content);
      }
    }
    _return.push(_book);
  });

  //console.log(booksWithReviews);
  return _return;  // TODO: Implement
}

/**
 * Displays data from passed `books` array. For example, if books argument would have following value:
 *    books = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 * then, following structure should be created under the parentNode:
 * <ol>
 *    <li>
 *      <span>Some book title</span>
 *      <ul>
 *        <li>Great book! by John</li>
 *      </ul>
 *    </li>
 * </ol>
 * @param parentNode - parent node for all books
 * @param booksWithReviews - an array of BookWithReviews objects.
 */
export function displayBooksWithReviews(parentNode, booksWithReviews) {
  if(!booksWithReviews.length)  return;

  let newDiv = `<ol>`;  
  for(const book of booksWithReviews){
    newDiv += "<li>";
    newDiv  += `<span>${book.title}</span>`;
    if(book.reviews.length){
      newDiv += "<ul>";
      for(const review of book.reviews){
        newDiv += `<li>${review.content} by ${review.author}</li>`;
      }
      newDiv += "</ul>";
    }
    newDiv += "</li>";
  }
  newDiv += "</ol>";

  parentNode.innerHTML = newDiv;
}
