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
import Post from './Post';
import PostLayout from './PostLayout';


function App() {
  
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/header'>Header</Link></li>
          <li><Link to='/nav'>Nav</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/postpage'>PostPage</Link></li>
          <li><Link to='/footer'>Footer</Link></li>
        </ul>
      </nav>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/header' element={<Header/>} />
          <Route path='/nav' element={<Nav/>} />
          <Route path='/footer' element ={<Footer/>}/>

          <Route path='/postpage' element={<PostLayout/>} >
            <Route index element={<PostPage/>} />
            <Route path=':id' element={<Post/>} />
            <Route path='newpost' element={<NewPost/>} />
          </Route>
          <Route path='*' element={<Missing/>} />

      </Routes>
    </div>
  );
}

export default App;
