import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Nav from './components/ui/nav/Nav';
import SearchPage from './components/pages/SearchPage';
import JobPage from './components/pages/JobPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/job/:id" element={<JobPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
