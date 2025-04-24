import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { advancedSearch } from '../redux/booksSlice';

const AdvancedSearch = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  
  const allAuthors = [...new Set(books.flatMap(book => book.authors || []))];
  const allCategories = [...new Set(books.flatMap(book => book.categories || []))];
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const onSubmit = (data) => {
    data.categories = selectedCategories;
    if (data.authors && typeof data.authors === 'string' && data.authors.trim() !== '') {
      data.authors = [data.authors];
    } else {
      data.authors = [];
    }
    dispatch(advancedSearch(data));
  };
  
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const handleReset = () => {
    reset();
    setSelectedCategories([]);
    dispatch(advancedSearch({}));
  };

  return (
    <div className="p-3 border rounded">
      <h3>Advanced Search</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" {...register('title')} placeholder="Book title" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" {...register('isbn')} placeholder="ISBN" />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Page Count (minimum)</Form.Label>
              <Form.Control type="number" {...register('pageCount')} placeholder="Minimum pages" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" {...register('status')} placeholder="Book status" />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Published Date (From)</Form.Label>
              <Form.Control type="date" {...register('publishedDateFrom')} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Published Date (To)</Form.Label>
              <Form.Control type="date" {...register('publishedDateTo')} />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Select {...register('authors')}>
            <option value="">Select Author</option>
            {allAuthors.map((author, index) => (
              <option key={index} value={author}>{author}</option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Categories</Form.Label>
          <div className="d-flex flex-wrap">
            {allCategories.map((category, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`category-${index}`}
                label={category}
                className="me-3 mb-2"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            ))}
          </div>
        </Form.Group>
        
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Search
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
