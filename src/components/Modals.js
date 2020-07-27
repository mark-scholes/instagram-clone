import React from "react";
import Modal from "@material-ui/core/Modal";
import { Input, Button } from "@material-ui/core";
import { db, storage } from "../firebase";
import firebase from "firebase/app";
import "../Modals.css";

const Modals = ({
  open,
  setOpen,
  openSignIn,
  setOpenSignIn,
  modalStyle,
  classes,
  username,
  handleChange,
  email,
  password,
  signUp,
  signIn,
  fileModalOpen,
  setFileModalOpen,
  postDescription,
  handleFileChange,
  image,
  setProgress,
  progress,
  user,
  setPostDescription,
  setImage,
  likes,
}) => {
  const handleUpload = (e) => {
    // get a ref from storage db for a new folder called images
    // then store the current image (on stored in state)
    //the put that image with .put into that images folder
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //create a listener that checks for a state_change
    //then ask for a snapshot when that state_change happens
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function to inform user
        //gives a percentage of upload done
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //asigns that value to progress to state var
        setProgress(progress);
      },
      (error) => {
        //Error function
        console.log(error.message);
      },
      () => {
        //complete function
        //actually get the link from the database now it's been uploaded.
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //port image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              postDesc: postDescription,
              imgUrl: url,
              username: user.displayName,
              likes: likes,
            });
            setProgress(0);
            setPostDescription("");
            setImage("");
            setFileModalOpen(false);
          });
      }
    );
  };
  return (
    <>
      {fileModalOpen ? (
        <>
          <Modal open={fileModalOpen} onClose={() => setFileModalOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <div className="Modals__form Modals__imageUpload">
                <progress
                  className="Modals__progress"
                  value={progress}
                  max="100"
                ></progress>
                <Input
                  type="text"
                  value={postDescription}
                  placeholder="Post Description"
                  onChange={handleChange}
                  fullWidth
                />
                <Input type="file" onChange={handleFileChange} />
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
      {open ? (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="Modals__form">
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
                fullWidth
              />
              <Input
                required
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => handleChange(e)}
                fullWidth
              />
              <Input
                required
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => handleChange(e)}
                fullWidth
              />

              <Button onClick={signUp} type="submit">
                Sign Up
              </Button>
            </form>
          </div>
        </Modal>
      ) : (
        openSignIn && (
          <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className="Modals__form">
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
                  fullWidth
                />
                <Input
                  required
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                />

                <Button type="submit" onClick={signIn}>
                  Log In
                </Button>
              </form>
            </div>
          </Modal>
        )
      )}
    </>
  );
};

export default Modals;
