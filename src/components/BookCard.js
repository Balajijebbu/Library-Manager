import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/booksSlice';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';

const BookCard = ({ book, deleteBook }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.books.favorites);
  const isFavorite = favorites.some((fav) => fav.id === book.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: book.title,
    authors: book.authors?.join(', ') || '',
    categories: book.categories?.join(', ') || '',
    publishedDate: book.publishedDate?.$date ? new Date(book.publishedDate.$date).toISOString().substring(0, 10) : '',
    pageCount: book.pageCount || '',
    status: book.status || '',
    thumbnailUrl: book.thumbnailUrl || '',
  });

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(book.id));
    } else {
      dispatch(addToFavorites(book));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setEditedBook({
      title: book.title,
      authors: book.authors?.join(', ') || '',
      categories: book.categories?.join(', ') || '',
      publishedDate: book.publishedDate?.$date ? new Date(book.publishedDate.$date).toISOString().substring(0, 10) : '',
      pageCount: book.pageCount || '',
      status: book.status || '',
      thumbnailUrl: book.thumbnailUrl || '',
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden" style={{ transition: 'transform 0.3s ease' }}>
        <Form className="p-3">
          {/* Form fields here */}
          <div className="d-flex gap-2 mt-2">
            <Button variant="success" onClick={saveChanges}>Save</Button>
            <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
          </div>
        </Form>
      </Card>
    );
  }

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden" style={{ transition: 'transform 0.3s ease' }}>
      {editedBook.thumbnailUrl && (
        <Card.Img
          variant="top"
          src={editedBook.thumbnailUrl}
          alt={editedBook.title}
          style={{ height: '280px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-semibold fs-5">{editedBook.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
            {editedBook.authors}
          </Card.Subtitle>
          <Card.Text className="text-secondary" style={{ fontSize: '0.85rem' }}>
            <strong>Published:</strong> {new Date(editedBook.publishedDate).toLocaleDateString() || 'N/A'}<br />
            <strong>Categories:</strong> {editedBook.categories || 'N/A'}<br />
            <strong>Pages:</strong> {editedBook.pageCount || 'N/A'}<br />
            <strong>Status:</strong> {editedBook.status || 'N/A'}
          </Card.Text>
        </div>
        <div className="d-flex gap-2 mt-2">
          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            variant="secondary"
            className="flex-grow-1"
            onClick={() => setIsEditing(true)}
          >
            Update
          </Button>
          <Button
            variant="danger"
            className="flex-grow-1 d-flex align-items-center justify-content-center"
            onClick={() => deleteBook(book.id)}
          >
            <FaTrash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
