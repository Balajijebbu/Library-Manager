import React from 'react';
import { Container } from 'react-bootstrap';
import BookList from '../components/BookList';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector((state) => state.books.favorites);
  
  return (
    <Container className="py-4">
      <h2>Favorite Books</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any books to your favorites yet.</p>
      ) : (
        <BookList books={favorites} />
      )}
    </Container>
  );
};

export default Favorites;