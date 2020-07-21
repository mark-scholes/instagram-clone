import React from "react";
import Modal from "@material-ui/core/Modal";
import { Input, Button } from "@material-ui/core";

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
}) => {
  return (
    <>
      {open ? (
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
      ) : (
        openSignIn && (
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
        )
      )}
    </>
  );
};

export default Modals;
