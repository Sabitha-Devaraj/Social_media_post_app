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
import api from './api/posts'
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';

function App() {
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState('')
  //const [searchResults,setSearchResults] = useState([])
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')

  const {width} = useWindowSize()

  const navigate = useNavigate() //Hook

  useEffect( () => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts')
        setPosts(response.data)
      }
      catch(err){
        if(err.response){
          console.log(err.response.status)
          console.log(err.response.data)
          console.log(err.response.headers)
        }
        else{
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts();
  },[]) 

 // const filteredResults = posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()) 
                                             // || ((post.body).toLowerCase()).includes(search.toLowerCase())
   //                                   )    
 // setSearchResults(filteredResults.reverse())

  const handleSubmit = async (e)=> {
    e.preventDefault()
    const id = posts.length 
              ? posts[posts.length-1].id + 1
              : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id,title : postTitle,datetime,body : postBody}
    try{
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts,response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }
    catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`)
      const filteredPost = posts.filter(post => post.id !== id)
      setPosts(filteredPost)
      navigate('/')
    }
    catch(err){
      console.log(`Error: ${err.message}`)
    }
  }

  const handleEdit = async (id) => {
    
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {id, title : editTitle, datetime, body : editBody}
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }
    catch(err){
    
    } 

  }

  return (
    <div className="App">
      <Header 
        title = 'Social Media App'
        width = {width}
      />
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />
      <Routes>
        <Route path='/' element = {
          <Home  // posts = {searchResults}
             posts = {posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()) 
                                        || ((post.body).toLowerCase()).includes(search.toLowerCase())
                                  ).reverse()}
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
        <Route path='/edit/:id' element={
            <EditPost 
              posts ={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle}
              setEditBody={setEditBody}
            />}
        /> 
        <Route path='about' element = {<About />} />
        <Route path='*' element ={<Missing/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
