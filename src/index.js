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
                <img id="${x.book_id}" src="https://covers.openlibrary.org/b/id/${x.book_id}-M.jpg" alt="" width="100px">
            </article>`
            });
            document.getElementById('booksWishlist').innerHTML = htmlWishlistString;
        }
    },
    showBookInfo(id, location) {
        console.log(id)
        fetch(`https://web2-courseproject-liese.herokuapp.com/book:?id=${id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                let htmlString = `  <div>
                <img src="https://covers.openlibrary.org/b/id/${data.book_id}-L.jpg" alt="">
            </div>
            <div>
                <div id="mainInfo">
                    <p>TITLE: ${data.title}</p>
                    <p>AUTHOR: ${data.author}</p>
                </div>
                <div id="personalInfo">
                    <p>STARTED: ${data.started}</p>
                    <p>FINISHED: ${data.finished}</p>
                    <p>PROCES: ${data.proces}</p>
                    <p>FAVORITE CHARACTER: ${data.favorite_character}</p>
                    <p>FAVORITE CHAPTER: ${data.favorite_chapter}</p>
                </div>
                <div id="extraInfo">
                    <div id="quote">
                        <p>FAVORITE QUOTE</p>
                        <p>${data.favorite_quote}</p>
                    </div>
                    <div id="rating">
                        <p>RATING: ${data.rating}/5</p> `
                if (data.current_read) {
                    htmlString += `<p>CURRENT READ: YES</p>`
                } else {
                    htmlString += `<p>CURRENT READ: NO</p>`
                }

                if (data.to_be_read) {
                    htmlString += `<p>TO BE READ: YES</p>`
                } else {
                    htmlString += `<p>TO BE READ: NO</p>`
                }


               htmlString += `</div>
                </div>
                <div id="buttonsInfo">
                    <p id="return">Return</p>
                    <p id="edit">Edit</p>
                </div>
                </div>`

                document.getElementById("bookInfoWishlist").innerHTML = htmlString;

                document.getElementById("edit").addEventListener('click', (e) => {
                    Ownbooks.editForm(id)
                })

                document.getElementById('return').addEventListener('click', (e) => {
                    document.getElementById("bookInfoWishlist").innerHTML = "";
                    document.getElementById(location).style.display = "inherit";
                    document.getElementById("bookInfoWishlist").style.display = "none";
                })
            })
    },
    editForm(id){
        console.log('ready to edit')
    }
}

if (window.location.pathname == '/docs/html/home.html' || window.location.pathname == '/docs/html/bookshelf.html' || window.location.pathname == '/docs/html/wishlist.html') {
    Ownbooks.init();
}

if (window.location.pathname == '/docs/html/bookshelf.html') {
    document.getElementById('booksBookshelf').addEventListener('click', (e) => {
        if (e.target.id !== "booksBookshelf") {
            document.getElementById('mainBookshelf').style.display = "none"
            document.getElementById('bookInfoWishlist').style.display = "flex"
            Ownbooks.showBookInfo(e.target.id, "mainBookshelf")
        }
    })
}

if (window.location.pathname == '/docs/html/wishlist.html') {
    document.getElementById('booksWishlist').addEventListener('click', (e) => {
        if (e.target.id !== "booksWishlist") {
            document.getElementById('mainWishlist').style.display = "none"
            document.getElementById('bookInfoWishlist').style.display = "flex"
            Ownbooks.showBookInfo(e.target.id, "mainWishlist")
        }
    })
}