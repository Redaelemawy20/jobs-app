import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Nav from './components/ui/nav/Nav';
import SearchPage from './components/pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
