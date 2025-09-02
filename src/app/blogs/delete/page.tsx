"use client"

import { useEffect, useState } from 'react';

export default function Delete() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = async () => {
    if (!selectedId) {
      alert("Select a post to delete");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${selectedId}`, { method: 'DELETE' });
    alert("Post Deleted");
    setPosts(posts.filter(post => post._id !== selectedId));
    setSelectedId('');
  };

  return (
    <div className="container">
      <h1>Delete Post</h1>
      <select onChange={e => setSelectedId(e.target.value)} value={selectedId}>
        <option value="">Select Post</option>
        {posts.map(post => (
          <option key={post._id} value={post._id}>{post.title}</option>
        ))}
      </select><br />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
