import React, { useState, useEffect } from "react";
import "../Post.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";

const Post = ({ imgUrl, postDesc, username, likes, postId, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => unsubscribe();
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          src="https://scontent-dub4-1.cdninstagram.com/v/t51.2885-19/s150x150/106138120_637677640164512_3097153785498416021_n.jpg?_nc_ht=scontent-dub4-1.cdninstagram.com&_nc_ohc=9jOwGzNsiTwAX-rUKW1&oh=5a061e5d769aab86b2d7370bf4cc0786&oe=5F3D9AD9"
          alt={`${username}'s profile picture`}
          className="post__avatar"
        />
        <p className="post__profileName">{username}</p>
      </div>
      <img src={imgUrl} alt="postDescription" className="post__image" />
      <section className="post__icons">
        <FavoriteBorderIcon />
        <ChatBubbleOutlineIcon />
        <SendOutlinedIcon />
      </section>
      <p className="post__text">{likes} likes</p>
      <h4 className="post__text">
        <span className="post__profileName">{username}</span> {postDesc}
      </h4>
      {comments.length > 0 ? (
        <div className="Post__comments">
          {comments.map((comment) => (
            <h4 className="post__text">
              <span className="post__profileName">{comment.username}</span>{" "}
              {comment.text}
            </h4>
          ))}
        </div>
      ) : null}
      <section>
        <form className="Post_commentBox">
          <input
            className="Post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="Post__button"
            disable={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Post;
