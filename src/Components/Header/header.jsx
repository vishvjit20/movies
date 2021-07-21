import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  state = {
    newMovieName: "",
  };
  handleOnChange = (e) => {
    let value = e.target.value;
    this.setState({
      newMovieName: value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.setMovies(this.state.newMovieName);
    }
  };

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="logo.svg" alt="" />
        </div>
        <div className="search-btn">
          <input
            type="text"
            value={this.state.newMovieName}
            className="search-bar"
            placeholder="Search"
            onChange={this.handleOnChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </div>
    );
  }
}
export default Header;
