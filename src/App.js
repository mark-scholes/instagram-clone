import React from "react";
import Post from "./components/Post";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app_headerImg"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
      </div>
      {/* Logo */} {/* Login*/}
      {/* Posts */}
      {/* Posts */}
      {/* Posts */}
      <Post
        imgUrl="https://scontent-dub4-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/107909707_992606414505063_6928046262740606603_n.jpg?_nc_ht=scontent-dub4-1.cdninstagram.com&_nc_cat=103&_nc_ohc=tGmrSf9aqcMAX-TXb7f&oh=10fbecffc8bb523bf30014eb3a1c5200&oe=5F3D7174"
        postDesc="Tough day yesterday. Today is not going to be any easier but I'll give it all as always.
Let's goo !"
        username="charles_leclerc"
      />
      <Post
        imgUrl="https://scontent-dub4-1.cdninstagram.com/v/t51.2885-15/e35/106273077_780240586053076_9025947212786452349_n.jpg?_nc_ht=scontent-dub4-1.cdninstagram.com&_nc_cat=104&_nc_ohc=uRCKoSbG3KoAX_Cslkm&oh=2c02e1a1312206a0af6dd62cefe0a276&oe=5F3D1A06"
        postDesc="Happy with my Q3 lap but disappointed with the result. But in tough times, we all need to stay united and optimistic, working as much as possible to get back to where we want to be.
Tomorrow is the race and we'll give it all, let's do thissss !"
        username="charles_leclerc"
      />
      <Post
        imgUrl="https://scontent-dub4-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/106005219_120229149441781_1596582913546962104_n.jpg?_nc_ht=scontent-dub4-1.cdninstagram.com&_nc_cat=101&_nc_ohc=ZIjWO8QBT6EAX_j3pPO&oh=6fd9b6a396abe5365121af40e487097f&oe=5F3E34F2"
        postDesc="Only ONE week to go before racing again 😍"
        username="charles_leclerc"
      />
      {/* */}
      {/* */}
      {/* */}
    </div>
  );
};

export default App;
