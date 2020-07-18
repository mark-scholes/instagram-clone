import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import Header from "./components/Header";
import { db } from "./firebase";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="App">
      <Header />

      {posts.map((post) => (
        <Post
          imgUrl={post.imgUrl}
          postDesc={post.postDesc}
          username={post.username}
        />
      ))}

      {/* */}
      {/* */}
      {/* */}
    </div>
  );
};

export default App;
