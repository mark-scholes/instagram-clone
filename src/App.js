import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Post from "./components/Post";
import Header from "./components/Header";
import { db, auth } from "./firebase";
import "./App.css";
import { Input, Button } from "@material-ui/core";

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
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  //end of state

  //form handling
  const handleChange = (e) => {
    e.preventDefault();
    let field = e.target.placeholder;
    let value = e.target.value;
    field === "username" && setUsername(value);
    field === "email" && setEmail(value);
    field === "password" && setPassword(value);
  };
  //end of form handling

  //User authentication

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user is logged in
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
    return () => {
      //if the useEffect fires again perform some cleanup so multiple listeners aren't in place at once
      unsubscribe();
    };
  }, [user, username]);

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

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setOpen(false);
  };

  //End of User authentication

  const logOut = () => {
    auth.signOut();
    setUser(null);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error);
    });
    setOpenSignIn(false);
  };

  return (
    <div className="App">
      <Header
        setOpen={setOpen}
        user={user}
        logOut={logOut}
        setOpenSignIn={setOpenSignIn}
        signIn={signIn}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="LogInForm__form">
            <center>
              <img
                className="app_headerImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
              />
            </center>
            <Input
              required
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />

            <Button onClick={signUp} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="LogInForm__form">
            <center>
              <img
                className="app_headerImg"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
              />
            </center>
            <Input
              required
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <Input
              required
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />

            <Button type="submit" onClick={signIn}>
              Log In
            </Button>
          </form>
        </div>
      </Modal>

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
