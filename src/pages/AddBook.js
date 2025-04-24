import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';

const AddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    authors: '',
    publishedDate: '',
    categories: '',
    pageCount: '',
    status: '',
    thumbnailUrl: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookData.id || !bookData.title) {
      setError('Please provide at least an ID and Title.');
      return;
    }
    setError('');


    const newBook = {
      id: bookData.id,
      title: bookData.title,
      authors: bookData.authors ? bookData.authors.split(',').map(a => a.trim()) : [],
      publishedDate: bookData.publishedDate ? { $date: bookData.publishedDate } : null,
      categories: bookData.categories ? bookData.categories.split(',').map(c => c.trim()) : [],
      pageCount: bookData.pageCount ? parseInt(bookData.pageCount, 10) : 0,
      status: bookData.status,
      thumbnailUrl: bookData.thumbnailUrl,
      description: bookData.description,
    };


    localStorage.setItem('lastAddedBook', JSON.stringify(newBook));


    dispatch(addBook(newBook));

    setSuccess('Book added successfully!');

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <Container className="mt-4">
      <h2>Add New Book</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBookId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter unique book ID"
            name="id"
            value={bookData.id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookAuthors">
          <Form.Label>Authors (comma separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter authors"
            name="authors"
            value={bookData.authors}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookPublishedDate">
          <Form.Label>Published Date (YYYY-MM-DD)</Form.Label>
          <Form.Control
            type="date"
            name="publishedDate"
            value={bookData.publishedDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookCategories">
          <Form.Label>Categories (comma separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter categories"
            name="categories"
            value={bookData.categories}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookPageCount">
          <Form.Label>Page Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter page count"
            name="pageCount"
            value={bookData.pageCount}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status (e.g., PUBLISH)"
            name="status"
            value={bookData.status}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookThumbnailUrl">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="thumbnailUrl"
            value={bookData.thumbnailUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBookDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </Container>
  );
};

export default AddBook;
