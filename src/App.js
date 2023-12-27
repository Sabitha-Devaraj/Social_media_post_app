import './index.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/newpost'>NewPost</Link></li>
        </ul>
      </nav>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/newpost' element={<NewPost/>} />
      </Routes>
    </div>
  );
}

export default App;
