import _ from 'lodash';

"use strict"

let books = {
    getBooks() {
        console.log("yes")
        fetch('https://web2-courseproject-liese.herokuapp.com/books')
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                let htmlString = ``
                for (let i = 0; i < 7; i++) {
                    htmlString += `<article id="${data[i]._id}">
                <img src="https://covers.openlibrary.org/b/id/${data[i].book_id}-M.jpg" alt="" width="100px">
            </article>`
                }
                document.getElementById('previewBookshelf').innerHTML = htmlString;
            })
    }
}

books.getBooks();