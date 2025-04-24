import { createSlice } from '@reduxjs/toolkit';
import booksData from '../data/books.json';

const localStorageLastAddedBookRaw = localStorage.getItem('lastAddedBook');
const localStorageLastAddedBook = localStorageLastAddedBookRaw ? JSON.parse(localStorageLastAddedBookRaw) : null;


const normalizeBooks = (books) => {
  return books.map(book => ({
    ...book,
    id: book._id
  }));
};


const normalizedJsonBooks = normalizeBooks(booksData);


const mergeBooks = (lastAddedBook, jsonBooks) => {
  const map = new Map();
  jsonBooks.forEach(book => map.set(book.id, book));
  if (lastAddedBook && !map.has(lastAddedBook.id)) {
    map.set(lastAddedBook.id, lastAddedBook);
  }
  return Array.from(map.values());
};

const initialBooks = mergeBooks(localStorageLastAddedBook, normalizedJsonBooks);

const initialState = {
  books: initialBooks,
  filteredBooks: initialBooks,
  favorites: [],
  searchQuery: '',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload === '') {
        state.filteredBooks = state.books;
      } else {
        state.filteredBooks = state.books.filter(book =>
          book.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.some(book => book.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(book => book.id !== action.payload);
    },
    advancedSearch: (state, action) => {
      const { title, isbn, pageCount, publishedDateFrom, publishedDateTo, status, authors, categories } = action.payload;


      const normTitle = title ? title.trim().toLowerCase() : null;
      const normIsbn = isbn ? isbn.trim() : null;
      const normStatus = status ? status.trim().toLowerCase() : null;
      const normAuthors = authors && authors.length > 0 ? authors.map(a => a.trim().toLowerCase()) : [];
      const normCategories = categories && categories.length > 0 ? categories.map(c => c.trim().toLowerCase()) : [];

      state.filteredBooks = state.books.filter(book => {
        let match = true;


        const bookTitle = book.title ? book.title.toLowerCase() : '';
        const bookIsbn = book.isbn ? book.isbn : '';
        const bookStatus = book.status ? book.status.toLowerCase() : '';
        const bookAuthors = book.authors ? book.authors.map(a => a.toLowerCase()) : [];
        const bookCategories = book.categories ? book.categories.map(c => c.toLowerCase()) : [];

        if (normTitle && !bookTitle.includes(normTitle)) {
          match = false;
        }

        if (normIsbn && bookIsbn !== normIsbn) {
          match = false;
        }

        if (pageCount && book.pageCount < parseInt(pageCount)) {
          match = false;
        }

        if (publishedDateFrom && new Date(book.publishedDate.$date) < new Date(publishedDateFrom)) {
          match = false;
        }

        if (publishedDateTo && new Date(book.publishedDate.$date) > new Date(publishedDateTo)) {
          match = false;
        }

        if (normStatus && bookStatus !== normStatus) {
          match = false;
        }

        if (normAuthors.length > 0 && !bookAuthors.some(author => normAuthors.includes(author))) {
          match = false;
        }

        if (normCategories.length > 0 && !bookCategories.some(category => normCategories.includes(category))) {
          match = false;
        }

        return match;
      });
    },
    addBook: (state, action) => {

      const newBook = { ...action.payload, id: action.payload.id };
      state.books.push(newBook);
      state.filteredBooks.push(newBook);

    }
  }
});

export const { setSearchQuery, addToFavorites, removeFromFavorites, advancedSearch, addBook } = booksSlice.actions;

export default booksSlice.reducer;
