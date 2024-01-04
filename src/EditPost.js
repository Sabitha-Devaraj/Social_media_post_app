import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editBody,editTitle,setEditBody,setEditTitle}) => {
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  useEffect(() => {
    if(post){
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  },[post,setEditTitle,setEditBody])

  return (
    <main className='PostPage'>
      {
        editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              id='postTitle' 
              type = 'text'
              required
              value = {editTitle}
              onChange = {(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea 
              id='postBody'
              required
              value = {editBody}
              onChange = {(e) => setEditBody(e.target.value)}
            />
            <button type='submit' className='saveButton' onClick={() => handleEdit(post.id)}>Save Changes</button>
            <Link to='/'><button className='cancelButton'>Cancel Changes</button></Link>
          </form>
        </>
    }
    {
      !editTitle &&
      <>
        <h2>Page Not Found!</h2>
        <p>Well, that's disappointing</p>
        <p>Please Visit Our Homepage</p>
      </>
    }
    </main>
  )
}

export default EditPost