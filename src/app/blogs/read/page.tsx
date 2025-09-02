"use client"

import { useEffect, useState } from 'react';

export default function Read() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/blogs')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="container">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
