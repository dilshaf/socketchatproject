import React, { useState } from 'react';
import axios from 'axios';

const Update= ({ postid, commentId, currentText, currentUsername, currentImage, onUpdateComment }) => {
  const [text, setText] = useState(currentText || '');
  const [username, setUsername] = useState(currentUsername || '');
  const [image, setImage] = useState(currentImage || '');

  const handleUpdateComment = async () => {
    try {
      const response = await axios.put('/api/updateComment', {
        postid,
        commentId,
        text,
        username,
        image,
      });

      if (response.status === 200) {
        onUpdateComment(response.data.post);
      } else {
        console.error('Error updating comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div>
      <label>
        Text:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdateComment}>Update Comment</button>
    </div>
  );
};

export default Update;
