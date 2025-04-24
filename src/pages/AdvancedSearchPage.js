import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AdvancedSearch from '../components/AdvancedSearch';
import BookList from '../components/BookList';
import { useSelector, useDispatch } from 'react-redux';
import { advancedSearch } from '../redux/booksSlice';

const AdvancedSearchPage = () => {
  const dispatch = useDispatch();
  const filteredBooks = useSelector((state) => state.books.filteredBooks);

  useEffect(() => {

    dispatch(advancedSearch({}));
  }, [dispatch]);

  return (
    <Container className="py-4">
      <AdvancedSearch />
      <hr />
      <BookList books={filteredBooks} />
    </Container>
  );
};

export default AdvancedSearchPage;
