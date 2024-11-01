import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Nav from './components/ui/nav/Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="App">
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
