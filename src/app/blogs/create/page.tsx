"use client"

import { useState } from 'react';

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    alert('Post Created: ' + data.title);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="container">
      <h1>Create Post</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
