import _, {
    method
} from 'lodash';

"use strict";


//load all books in home section
let Ownbooks = {
    init() {
        fetch('https://web2-courseproject-liese.herokuapp.com/books')
            .then(resp => resp.json())
            .then(data => {
                let bookshelfBooks = data.filter(data => data.wishlist == false);
                let wishlistBooks = data.filter(data => data.wishlist == true);
                this.getBooks(bookshelfBooks, wishlistBooks);
            });
    },
    getBooks(bookshelfBooks, wishlistBooks) {
        let htmlBookshelfString = ``;
        let htmlWishlistString = ``;
        if (window.location.pathname == '/docs/html/home.html') {
            for (let i = 0; i < 7; i++) {
                if (bookshelfBooks[i] !== undefined) {
                    htmlBookshelfString += `<article id="${bookshelfBooks[i].book_id}">
                    <img src="https://covers.openlibrary.org/b/id/${bookshelfBooks[i].book_id}-M.jpg" alt="" width="100px">
                    </article>`;
                }
            }
            document.getElementById('previewBookshelf').innerHTML = htmlBookshelfString;

            for (let i = 0; i < 7; i++) {
                if (wishlistBooks[i] !== undefined) {
                    htmlWishlistString += `<article id="${wishlistBooks[i].book_id}">
                    <img src="https://covers.openlibrary.org/b/id/${wishlistBooks[i].book_id}-M.jpg" alt="" width="100px">
                </article>`;
                }

            }
            document.getElementById('previewWishlist').innerHTML = htmlWishlistString;


        } else if (window.location.pathname == '/docs/html/bookshelf.html') {
            bookshelfBooks.forEach(x => {
                htmlBookshelfString += `<article id="${x.book_id}">
                <img id="${x.book_id}" src="https://covers.openlibrary.org/b/id/${x.book_id}-M.jpg" alt="" width="100px">
            </article>`;
            });
            document.getElementById('booksBookshelf').innerHTML = htmlBookshelfString;



        } else if (window.location.pathname == '/docs/html/wishlist.html') {
            wishlistBooks.forEach(x => {
                htmlWishlistString += `<article id="${x.book_id}">
                <img id="${x.book_id}" src="https://covers.openlibrary.org/b/id/${x.book_id}-M.jpg" alt="" width="100px">
            </article>`;
            });
            document.getElementById('booksWishlist').innerHTML = htmlWishlistString;
        }
    },
    showBookInfo(id, location) {
        fetch(`https://web2-courseproject-liese.herokuapp.com/book:?id=${id}`)
            .then(resp => resp.json())
            .then(data => {
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
                        <p>RATING: ${data.rating}/5</p> `;
                if (data.current_read) {
                    htmlString += `<p>CURRENT READ: YES</p>`;
                } else {
                    htmlString += `<p>CURRENT READ: NO</p>`;
                }

                if (data.to_be_read) {
                    htmlString += `<p>TO BE READ: YES</p>`;
                } else {
                    htmlString += `<p>TO BE READ: NO</p>`;
                }

                if (data.wishlist) {
                    htmlString += `<p>WISHLIST: YES </p>`;
                } else {
                    htmlString += `<p>WISHLIST: NO </p>`;
                }


                htmlString += `</div>
                </div>
                <div id="buttonsInfo">
                    <p id="return">Return</p>
                    <p id="delete">Delete</p>
                    <p id="edit">Edit</p>
                </div>
                </div>`;

                document.getElementById("bookInfoWishlist").innerHTML = htmlString;

                document.getElementById("edit").addEventListener('click', (e) => {
                    Ownbooks.editForm(id, location);
                })

                document.getElementById("delete").addEventListener('click', (e) => {
                    Ownbooks.deleteBook(id)
                })

                document.getElementById('return').addEventListener('click', (e) => {
                    window.location.reload();
                })
            })
    },
    editForm(id, location) {
        let htmlString = ` <div>
        <img src="https://covers.openlibrary.org/b/id/${id}-L.jpg" alt="">
    </div>
    <form action="submit">
        <div>
            <div id="mainInfo">
                <p>TITLE: <input type="text" id="title" placeholder="title"></p>
                <p>AUTHOR: <input type="text" id="author" placeholder="author"></p>
            </div>
            <div id="personalInfo">
                <p>STARTED: <input type="text" id="started" placeholder="start date"></p>
                <p>FINISHED: <input type="text" id="finished" placeholder="finish date"></p>
                <p>PROCES: <input type="text" id="proces" placeholder="proces"></p>
                <p>FAVORITE CHARACTER: <input type="text" id="favChar" placeholder="favorite character"></p>
                <p>FAVORITE CHAPTER: <input type="text" id="favChap" placeholder="favorite chapter"></p>
            </div>
            <div id="extraInfo">
                <div id="quoteInput">
                    <p>FAVORITE QUOTE</p>
                    <p><input type="text" id="favQuo" placeholder="favorite quote"></p>
                </div>
                <div id="ratingInput">
                    <p>RATING: <input type="text" id="stars" placeholder="#"></p>
                    <p>CURRENT READ: <input type="checkbox" id="CR"></p>
                    <p>TO BE READ: <input type="checkbox" id="TBR"></p>
                    <p>WISHLIST: <input type="checkbox" id="wishlist"></p>
                </div>
            </div>
            <div id="buttonsInfo">
                <p id="save">Save</p>
            </div>
        </div>
    </form>
     `;

        document.getElementById("bookInfoWishlist").innerHTML = htmlString;

        document.getElementById("save").addEventListener('click', (e) => {
            //check which values are filled in and send filled in values to function that send patch request
            var info = {};
            let title = document.getElementById('title').value;
            if (title != "") {
                var value = "title";
                var insertedvalue = title;
                info[value] = insertedvalue;
            }

            let author = document.getElementById('author').value;
            if (author != "") {
                var value = "author";
                var insertedvalue = author;
                info[value] = insertedvalue;
            }

            let started = document.getElementById('started').value;
            if (started != "") {
                var value = "started";
                var insertedvalue = started;
                info[value] = insertedvalue;
            }

            let finished = document.getElementById('finished').value;
            if (finished != "") {
                var value = "finished";
                var insertedvalue = finished;
                info[value] = insertedvalue;
            }

            let proces = document.getElementById('proces').value;
            if (proces != "") {
                var value = "proces";
                var insertedvalue = proces;
                info[value] = insertedvalue;
            }

            let favChar = document.getElementById('favChar').value;
            if (favChar != "") {
                var value = "favorite_character";
                var insertedvalue = favChar;
                info[value] = insertedvalue;
            }

            let favChap = document.getElementById('favChap').value;
            if (favChap != "") {
                var value = "favorite_chapter";
                var insertedvalue = favChap;
                info[value] = insertedvalue;
            }

            let favQuo = document.getElementById('favQuo').value;
            if (favQuo != "") {
                var value = "favorite_quote";
                var insertedvalue = favQuo;
                info[value] = insertedvalue;
            }

            let stars = document.getElementById('stars').value;
            if (stars != "") {
                var value = "rating";
                var insertedvalue = `${stars}/5`;
                info[value] = insertedvalue;
            }

            let CR = document.getElementById('CR').checked;
            var CRvalue = "current_read";
            var insertedvalue = CR;
            info[CRvalue] = insertedvalue;

            let TBR = document.getElementById('TBR').checked;
            var TBRvalue = "to_be_read";
            var insertedvalue = TBR;
            info[TBRvalue] = insertedvalue;

            let wishlist = document.getElementById('wishlist').checked;
            var wishValue = "wishlist";
            var insertedvalue = wishlist;
            info[wishValue] = insertedvalue;

            Ownbooks.sendInfo(info, id, location);
        })

    },
    sendInfo(info, id, location) {

        fetch(`https://web2-courseproject-liese.herokuapp.com/books:?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info)
            })
            .then(response => response.json())
            .then(data => {
                console.log('challenge changed', data);
                Ownbooks.showBookInfo(id, location)

            });
    },
    deleteBook(id) {
        console.log("delete!")
        fetch(`https://web2-courseproject-liese.herokuapp.com/books:?id=${id}`, {
                method: 'DELETE'
            })
            .then(resp => resp.json())
            .then(data => {
                window.location.reload();
            })
    }
}

let Library = {
    init() {
        fetch('https://openlibrary.org/subjects/teens.json?limit=12&published_in=2000-2020')
            .then(resp => resp.json())
            .then(data => {
                let htmlString = ``;
                console.log(data);
                data.works.forEach(x => {
                    htmlString += `<article>
                <img id="${x.title}" src="https://covers.openlibrary.org/b/id/${x.cover_id}-M.jpg" alt="" width="100px">
            </article>`;
                })
                document.getElementById('foundBooks').innerHTML = htmlString;
            })
        document.getElementById('searchText').addEventListener('change', (e) =>{
            let searchParameter = document.getElementById('search').value
            Library.searchBooks(searchParameter);
        })
    },
    showInfoToAdd(title) {
        fetch(`https://openlibrary.org/search.json?q=${title}&limit=1`)
            .then(resp => resp.json())
            .then(data => {
                let htmlString = ` <div>
                <img src="https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg" alt="">
            </div>
            <div>
                <div id="mainInfo">
                    <p>TITLE: ${data.docs[0].title}</p>
                    <p>AUTHOR: ${data.docs[0].author_name[0]}</p>
                </div>
                <div id="personalInfo">
                    <p>STARTED: <input type="text" id="started" placeholder="start date"></p>
                    <p>FINISHED: <input type="text" id="finished" placeholder="finish date"></p>
                    <p>PROCES: <input type="text" id="proces" placeholder="proces"></p>
                    <p>FAVORITE CHARACTER:<input type="text" id="favChar" placeholder="favorite character"></p>
                    <p>FAVORITE CHAPTER:<input type="text" id="favChap" placeholder="favorite chapter"></p>
                </div>
                <div id="extraInfo">
                    <div id="quoteInput">
                        <p>FAVORITE QUOTE</p>
                        <p><input type="text" id="favQuo" placeholder="favorite quote"></p>
                    </div>
                    <div id="ratingInput">
                        <p>RATING:<input type="text" id="stars" placeholder="#">/5</p> 
                        <p>CURRENT READ:<input type="checkbox" id="CR"> </p>   
                        <p>TO BE READ:<input type="checkbox" id="TBR"> </p>
                        <p>WISHLIST: <input type="checkbox" id="wishlist"></p>
                    </div>
                </div>
                 <div id="buttonsInfo">
                    <p id="return">Return</p>
                    <p id="add">Add</p>
                </div>
            </div>`;
                document.getElementById('addBook').innerHTML = htmlString;
            
            document.getElementById('return').addEventListener('click', (e) =>{
                window.location.reload();
            })

            document.getElementById('add').addEventListener('click', (e) =>{
                let id = data.docs[0].cover_i
                let title = data.docs[0].title;
                let author = data.docs[0].author_name[0];
                let started = document.getElementById('started').value;
                let finished = document.getElementById('finished').value;
                let proces = document.getElementById('proces').value;
                let favChar = document.getElementById('favChar').value;
                let favChap = document.getElementById('favChap').value;
                let favQuo = document.getElementById('favQuo').value;
                let stars = document.getElementById('stars').value;
                let CR = document.getElementById('CR').checked;
                let TBR = document.getElementById('TBR').checked;
                let wishlist = document.getElementById('wishlist').checked;
                Library.addBook(id, title, author, started, finished, proces, favChar, favChap, favQuo, stars, CR,TBR,wishlist);
            })
            
            })

    },
    addBook(id, title, author, started, finished, proces, favChar, favChap, favQuo, stars, CR,TBR,wishlist){
        let book = {
            book_id: id.toString(),
            author: author,
            title: title,
            started: started,
            finished:finished,
            proces: proces,
            rating: stars,
            favorite_character: favChar,
            favorite_chapter: favChap,
            favorite_quote: favQuo,
            wishlist: wishlist,
            current_read: CR,
            to_be_read: TBR
        }
        //post user created challenge
        fetch('https://web2-courseproject-liese.herokuapp.com/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book)
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            });
    },
    getBooksGenre(genre){
        fetch(`https://openlibrary.org/subjects/${genre}.json?limit=12&published_in=2000-2020`)
            .then(resp => resp.json())
            .then(data => {
                let htmlString = ``;
                console.log(data);
                data.works.forEach(x => {
                    htmlString += `<article>
                <img id="${x.title}" src="https://covers.openlibrary.org/b/id/${x.cover_id}-M.jpg" alt="" width="100px">
            </article>`;
                })
                document.getElementById('foundBooks').innerHTML = htmlString;
            })
    },
    searchBooks(param){
        fetch(`https://openlibrary.org/search.json?q=${param}`)
            .then(resp => resp.json())
            .then(data => {
                let filteredData = data.docs.filter(data => data.cover_i !== undefined);
                console.log(filteredData)
                let htmlString = ``;
                for(let i = 0; i <12; i++){
                    htmlString += `<article>
                    <img id="${filteredData[i].title}" src="https://covers.openlibrary.org/b/id/${filteredData[i].cover_i}-M.jpg" alt="" width="100px">
                    </article>`;
                }
                document.getElementById('foundBooks').innerHTML = htmlString;

            })
    }
}

if (window.location.pathname == '/docs/html/home.html' || window.location.pathname == '/docs/html/bookshelf.html' || window.location.pathname == '/docs/html/wishlist.html') {
    Ownbooks.init();
}

if (window.location.pathname == '/docs/html/bookshelf.html') {
    document.getElementById('booksBookshelf').addEventListener('click', (e) => {
        if (e.target.id !== "" && e.target.id !== "booksBookshelf") {
            document.getElementById('mainBookshelf').style.display = "none";
            document.getElementById('bookInfoWishlist').style.display = "flex";
            Ownbooks.showBookInfo(e.target.id, "mainBookshelf");
        }
    })
}

if (window.location.pathname == '/docs/html/wishlist.html') {
    document.getElementById('booksWishlist').addEventListener('click', (e) => {
        if (e.target.id !== "" && e.target.id !== "booksWishlist") {
            document.getElementById('mainWishlist').style.display = "none";
            document.getElementById('bookInfoWishlist').style.display = "flex";
            Ownbooks.showBookInfo(e.target.id, "mainWishlist");
        }
    })
}

if (window.location.pathname == '/docs/html/library.html') {
    Library.init();
}

if (window.location.pathname == '/docs/html/library.html') {
    document.getElementById('foundBooks').addEventListener('click', (e) => {
        console.log(e.target.id)
       if (e.target.id !== "" && e.target.id !== "foundBooks") {
            document.getElementById('searchForBook').style.display = "none";
            document.getElementById('addBook').style.display = "flex";
            Library.showInfoToAdd(e.target.id);
        } 
    })

    document.getElementById('genreButtons').addEventListener('click', (e) => {
        if (e.target.id !== "" && e.target.id !== "genreButtons") {
            Library.getBooksGenre(e.target.id)
        }
    })
}