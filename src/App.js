import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import AddBook from './pages/AddBook';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/advanced-search" element={<AdvancedSearchPage />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
