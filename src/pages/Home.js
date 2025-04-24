import React from 'react';
import { Container } from 'react-bootstrap';
import BookList from '../components/BookList';
import { useSelector } from 'react-redux';

const Home = () => {
  const filteredBooks = useSelector((state) => state.books.filteredBooks);
  
  return (
    <Container className="py-4">
      <BookList books={filteredBooks} />
    </Container>
  );
};

export default Home;