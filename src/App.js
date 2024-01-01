import './index.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
//import Post from './Post';
//import PostLayout from './PostLayout';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';


function App() {
  const [posts,setPosts] = useState([
    {
      id: 1,
      title: "My first post",
      datetime: "Fri 29 Dec 23:58:31 GMT 2023",
      body: "Bishwath turns 7 today"
    },
    {
      id: 2,
      title: "My second post",
      datetime: "Thu 28 Dec 13:18:03 GMT 2023",
      body: "Learning React Routers"
    },
    {
      id: 3,
      title: "My third post",
      datetime: "Sat 30 Dec 01:08:01 GMT 2023",
      body: "Building my first react app"
    },
    {
      id: 4,
      title: "My fourth post",
      datetime: "Wed 27 Dec 16:58:31 GMT 2023",
      body: "Enrich knowledge and get a job"
    }
  ])

  const [search,setSearch] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')

  const navigate = useNavigate() //Hook

  useEffect( () => {
    const filteredResults = posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()) 
                                                || ((post.body).toLowerCase()).includes(search.toLowerCase())
                                        )    
    setSearchResults(filteredResults.reverse())
  },[posts,search]) 

    
  const handleSubmit = (e)=> {
    e.preventDefault()
    const id = posts.length 
              ? posts[posts.length-1].id + 1
              : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id,title : postTitle,datetime,body : postBody}
    const allPosts = [...posts,newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleDelete = (id) => {
    
   const filteredPost = posts.filter(post => post.id !== id)
   setPosts(filteredPost)
   navigate('/')
  }

  return (
    <div className="App">
      <Header 
        title = 'Social Media App'
      />
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />
      <Routes>
        <Route path='/' element = {
          <Home 
            posts = {searchResults}
          />}
        />  
        <Route  path='post'>
          <Route index element ={
            <NewPost
              handleSubmit = {handleSubmit}
              postTitle = {postTitle}
              setPostTitle = {setPostTitle}
              postBody = {postBody}
              setPostBody ={setPostBody}
            />} 
          />
          <Route path=':id' element = {
            <PostPage 
              posts = {posts}
              handleDelete = {handleDelete}
            />}
          />
        </Route>
        <Route path='about' element = {<About />} />
        <Route path='*' element ={<Missing/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
