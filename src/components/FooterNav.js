import React from "react";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import HomeIcon from "@material-ui/icons/Home";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const FooterNav = ({ setFileModalOpen }) => {
  return (
    <div className="FooterNave__div">
      <HomeIcon />
      <SearchOutlinedIcon />

      <LocalHospitalOutlinedIcon onClick={() => setFileModalOpen(true)} />

      <FavoriteBorderOutlinedIcon />
      <PersonOutlineOutlinedIcon />
    </div>
  );
};

export default FooterNav;

// setFileModalOpen(true)
