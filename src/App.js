import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Post from "./components/Post";
import Header from "./components/Header";
import LogInForm from "./components/LogInForm";
import { db } from "./firebase";
import "./App.css";

const App = () => {
  //styles

  const getModalStyle = () => {
    const top = 50;
    const left = 50;
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  //end of styles

  //state
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  //end of state

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <LogInForm
        username={username}
        email={email}
        password={password}
        setUsername={(e) => setUsername}
        setEmail={(e) => setEmail}
        setPassword={setPassword}
      />
    </div>
  );

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="App">
      <Header setOpen={setOpen} />
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          {body}
        </Modal>
      </div>

      {posts.map(({ post, id }) => (
        <Post
          imgUrl={post.imgUrl}
          postDesc={post.postDesc}
          username={post.username}
          likes={post.likes}
          key={id}
        />
      ))}
    </div>
  );
};

export default App;
