import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="logo.svg" alt="" />
        </div>
        <div className="search-btn">
          <input type="text" className="search-bar" placeholder="Search" />
        </div>
      </div>
    );
  }
}
export default Header;
