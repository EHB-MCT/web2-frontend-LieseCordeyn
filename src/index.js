import _ from 'lodash';

"use strict"


//load all books in home section
let Ownbooks = {
    init() {
        fetch('https://web2-courseproject-liese.herokuapp.com/books')
            .then(resp => resp.json())
            .then(data => {
                let bookshelfBooks = data.filter(data => data.wishlist == false);
                let wishlistBooks = data.filter(data => data.wishlist == true);
                this.getBooks(bookshelfBooks, wishlistBooks)
            })
    },
    getBooks(bookshelfBooks, wishlistBooks) {
        let htmlBookshelfString = ``
        let htmlWishlistString = ``
        if (window.location.pathname == '/docs/html/home.html') {
            for (let i = 0; i < 7; i++) {
                if (bookshelfBooks[i] == undefined) {

                } else {
                    htmlBookshelfString += `<article id="${bookshelfBooks[i].book_id}">
                    <img src="https://covers.openlibrary.org/b/id/${bookshelfBooks[i].book_id}-M.jpg" alt="" width="100px">
                </article>`
                }
            }
            document.getElementById('previewBookshelf').innerHTML = htmlBookshelfString;

            for (let i = 0; i < 7; i++) {
                if (wishlistBooks[i] == undefined) {} else {
                    htmlWishlistString += `<article id="${wishlistBooks[i].book_id}">
                        <img src="https://covers.openlibrary.org/b/id/${wishlistBooks[i].book_id}-M.jpg" alt="" width="100px">
                    </article>`
                }

            }
            document.getElementById('previewWishlist').innerHTML = htmlWishlistString;


        } else if (window.location.pathname == '/docs/html/bookshelf.html') {
            bookshelfBooks.forEach(x => {
                htmlBookshelfString += `<article id="${x.book_id}">
                <img id="${x.book_id}" src="https://covers.openlibrary.org/b/id/${x.book_id}-M.jpg" alt="" width="100px">
            </article>`
            });
            document.getElementById('booksBookshelf').innerHTML = htmlBookshelfString;



        } else if (window.location.pathname == '/docs/html/wishlist.html') {
            wishlistBooks.forEach(x => {
                htmlWishlistString += `<article id="${x.book_id}">
                <img src="https://covers.openlibrary.org/b/id/${x.book_id}-M.jpg" alt="" width="100px">
            </article>`
            });
            document.getElementById('booksWishlist').innerHTML = htmlWishlistString;
        }
    },
    showBookInfo(id) {
        console.log(id)
        fetch(`https://web2-courseproject-liese.herokuapp.com/book?id=${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
}

if (window.location.pathname == '/docs/html/home.html' || window.location.pathname == '/docs/html/bookshelf.html' || window.location.pathname == '/docs/html/wishlist.html') {
    Ownbooks.init();
}

if (window.location.pathname == '/docs/html/bookshelf.html') {
    document.getElementById('booksBookshelf').addEventListener('click', (e) => {
        if (e.target.id !== "booksBookshelf") {
            Ownbooks.showBookInfo(e.target.id)
        }


    })
}