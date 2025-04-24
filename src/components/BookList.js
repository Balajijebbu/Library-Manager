import React, { useState, useEffect } from 'react';
import { Row, Col, Button, ButtonGroup, Pagination, Form } from 'react-bootstrap';
import BookCard from './BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/booksSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const BookList = ({ books }) => {
  const [viewType, setViewType] = useState('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({});
  const [localBooks, setLocalBooks] = useState(books);
  const itemsPerPage = 12;

  useEffect(() => {
    setLocalBooks(books);
    setCurrentPage(1);
  }, [books]);

  const favorites = useSelector((state) => state.books.favorites);
  const dispatch = useDispatch();

  const deleteBook = (bookId) => {
    setLocalBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
    };

  const handleFavoriteToggle = (book) => {
    const isFavorite = favorites.some(fav => fav.id === book.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(book.id));
    } else {
      dispatch(addToFavorites(book));
    }
  };

  const startEditing = (book) => {
    setEditingBookId(book.id);
    setEditedBook({
      title: book.title,
      authors: book.authors?.join(', ') || '',
      categories: book.categories?.join(', ') || '',
      publishedDate: book.publishedDate?.$date ? new Date(book.publishedDate.$date).toISOString().substring(0, 10) : '',
      pageCount: book.pageCount || '',
      status: book.status || '',
      thumbnailUrl: book.thumbnailUrl || '',
    });
  };

  const cancelEditing = () => {
    setEditingBookId(null);
    setEditedBook({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = (book) => {

    setLocalBooks(prevBooks => prevBooks.map(b => {
      if (b.id === book.id) {
        return {
          ...b,
          title: editedBook.title,
          authors: editedBook.authors.split(',').map(a => a.trim()),
          categories: editedBook.categories.split(',').map(c => c.trim()),
          publishedDate: { $date: new Date(editedBook.publishedDate).toISOString() },
          pageCount: Number(editedBook.pageCount),
          status: editedBook.status,
          thumbnailUrl: editedBook.thumbnailUrl,
        };
      }
      return b;
    }));
    setEditingBookId(null);
    setEditedBook({});
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = localBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const paginationItems = [];

  if (currentPage > 1) {
    paginationItems.push(
      <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} />
    );
  }

  const maxPageNumbersToShow = 5;
  const pagesToShow = Math.min(maxPageNumbersToShow, totalPages);

  for (let number = 1; number <= pagesToShow; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  if (totalPages > maxPageNumbersToShow) {
    if (currentPage < totalPages) {
      paginationItems.push(
        <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} />
      );
    }
    paginationItems.push(
      <Pagination.Item key="last" onClick={() => paginate(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Books</h2>
        <ButtonGroup>
          <Button
            variant={viewType === 'card' ? 'primary' : 'outline-primary'}
            onClick={() => setViewType('card')}
          >
            Card View
          </Button>
          <Button
            variant={viewType === 'list' ? 'primary' : 'outline-primary'}
            onClick={() => setViewType('list')}
          >
            List View
          </Button>
        </ButtonGroup>
      </div>

      {viewType === 'card' ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {currentBooks.map((book) => (
            <Col key={book.id}>
              <BookCard book={book} deleteBook={deleteBook} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="list-group shadow-sm rounded-3">
          {currentBooks.map((book) => {
            const isFavorite = favorites.some(fav => fav.id === book.id);
            const thumbnail = book.thumbnailUrl || book.imageLinks?.thumbnail || book.thumbnail || 'https://via.placeholder.com/100x150';

            if (editingBookId === book.id) {
              return (
                <div key={book.id} className="list-group-item py-3 px-4">
                  <Form>
                    <Form.Group className="mb-2" controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={editedBook.title}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formAuthors">
                      <Form.Label>Authors</Form.Label>
                      <Form.Control
                        type="text"
                        name="authors"
                        value={editedBook.authors}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formCategories">
                      <Form.Label>Categories</Form.Label>
                      <Form.Control
                        type="text"
                        name="categories"
                        value={editedBook.categories}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPublishedDate">
                      <Form.Label>Published Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="publishedDate"
                        value={editedBook.publishedDate}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPageCount">
                      <Form.Label>Page Count</Form.Label>
                      <Form.Control
                        type="number"
                        name="pageCount"
                        value={editedBook.pageCount}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        type="text"
                        name="status"
                        value={editedBook.status}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formThumbnailUrl">
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="thumbnailUrl"
                        value={editedBook.thumbnailUrl}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <div className="d-flex gap-2">
                      <Button variant="success" onClick={() => saveChanges(book)}>Save</Button>
                      <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                    </div>

                  </Form>
                </div>
              );
            }

            return (
              <div key={book.id} className="list-group-item py-3 px-4">
                <div className="d-flex align-items-start gap-3">
                  <img
                    src={thumbnail}
                    alt={book.title}
                    style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                  />

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-1 fw-semibold text-dark">{book.title}</h5>
                      <small className="text-muted">
                        {new Date(book.publishedDate?.$date).toLocaleDateString() || 'N/A'}
                      </small>
                    </div>
                    <p className="mb-1 text-muted">Authors: {book.authors?.join(', ') || 'Unknown'}</p>
                    <small className="text-secondary d-block mb-2">
                      Categories: {book.categories?.join(', ') || 'N/A'}
                    </small>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant={isFavorite ? "danger" : "outline-primary"}
                        onClick={() => handleFavoriteToggle(book)}
                        className="d-inline-flex align-items-center gap-2"
                      >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => startEditing(book)}
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteBook(book.id)}
                      >Delete</Button>
                        
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Pagination className="justify-content-center mt-4">
        {paginationItems}
      </Pagination>
    </div>
  );
};

export default BookList;
