"use client"

import { useEffect, useState } from 'react';

export default function Update() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleSelect = (post) => {
    setSelectedId(post._id);
    setTitle(post.title);
    setDescription(post.description);
  };

  const handleUpdate = async () => {
    if (!selectedId) {
      alert("Select a post to update");
      return;
    }
    const res = await fetch(`http://localhost:3000/blogs/${selectedId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    alert('Post Updated: ' + data.title);
  };

  return (
    <div className="container">
      <h1>Update Post</h1>
      <select onChange={e => handleSelect(posts.find(p => p._id === e.target.value))} value={selectedId}>
        <option value="">Select Post</option>
        {posts.map(post => (
          <option key={post._id} value={post._id}>{post.title}</option>
        ))}
      </select><br />
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
