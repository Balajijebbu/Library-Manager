import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/booksSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.books.searchQuery);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search by title"
        className="me-2"
        aria-label="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default SearchBar;