import React from "react";
import { Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const LogInForm = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  signUp,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  return (
    <div>
      <img
        className="app_headerImg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="instagram logo"
      />
      <Input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={signUp}>Sign Up</Button>
    </div>
  );
};

export default LogInForm;
