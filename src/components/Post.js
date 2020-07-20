import React from "react";
import "../Post.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Avatar from "@material-ui/core/Avatar";

const Post = ({ imgUrl, postDesc, username, likes }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          src="https://scontent-dub4-1.cdninstagram.com/v/t51.2885-19/s150x150/106138120_637677640164512_3097153785498416021_n.jpg?_nc_ht=scontent-dub4-1.cdninstagram.com&_nc_ohc=9jOwGzNsiTwAX-rUKW1&oh=5a061e5d769aab86b2d7370bf4cc0786&oe=5F3D9AD9"
          alt="charles_leclerc's profile"
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
      <section>Comments</section>
      <input type="text" placeholder="Add a comment" />
    </div>
  );
};

export default Post;
