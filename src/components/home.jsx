import React from 'react';
import '../App.css';
import Article from '../articles'
import BlogGrid from './bloggrid'

function Home() {
  return (
    <> 
    <h2 style={{ color: 'green' }}> Welcome to Blog client Demo</h2>     
     
      <BlogGrid />
    </>
  )
}
export default Home;