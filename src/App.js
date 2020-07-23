import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./components/Post";
import Modals from "./components/Modals";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";

import { db, auth } from "./firebase";
import "./App.css";

const App = () => {
  //styles

  const getModalStyle = () => {};

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      left: "50%",
      top: "30%",
      transform: "translate(-50%)",
      width: "40vw",
      height: "50vh",

      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(5, 6, 6),
      display: "flex",
      flexDirection: "column",
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
  const [postDescription, setPostDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [fileModalOpen, setFileModalOpen] = useState(false);
  //end of state

  //form handling
  const handleChange = (e) => {
    e.preventDefault();
    let field = e.target.placeholder;
    let value = e.target.value;
    field === "username" && setUsername(value);
    field === "email" && setEmail(value);
    field === "password" && setPassword(value);
    field === "Post Description" && setPostDescription(value);
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

  const handleFileChange = (e) => {
    //check to see if e.target has an array of files and there is one file at least in it
    //then set image in state as the first file in that array
    //this prevents issues if people try to multi upload
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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
      <Modals
        open={open}
        setOpen={setOpen}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        modalStyle={modalStyle}
        classes={classes}
        username={username}
        handleChange={handleChange}
        email={email}
        password={password}
        signUp={signUp}
        signIn={signIn}
        fileModalOpen={fileModalOpen}
        setFileModalOpen={setFileModalOpen}
        postDescription={postDescription}
        handleFileChange={handleFileChange}
        image={image}
        setProgress={setProgress}
        progress={progress}
        user={user}
        setPostDescription={setPostDescription}
        setImage={setImage}
      />

      {posts.map(({ post, id }) => (
        <Post
          imgUrl={post.imgUrl}
          postDesc={post.postDesc}
          username={post.username}
          likes={post.likes}
          key={id}
        />
      ))}

      <footer className="app__footer">
        <FooterNav setFileModalOpen={setFileModalOpen} />
      </footer>
    </div>
  );
};

export default App;
