import React from "react";
import Button from "@material-ui/core/Button";

const Header = ({ setOpen }) => {
  return (
    <div className="app__header">
      <div>
        <img
          className="app_headerImg"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
      </div>
      <div>
        <Button
          className="header__logInBtn"
          variant="contained"
          color="primary"
          type="button"
          onClick={() => setOpen(true)}
        >
          Log In
        </Button>

        <Button color="primary" className="header__signUpBtn">
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default Header;
