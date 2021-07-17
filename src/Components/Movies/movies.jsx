import React, { Component } from "react";
import Movie from "../Movie/movie";

class Movies extends Component {
  state = {};
  render() {
    return (
      <div className="movies">
        {this.props.movies.map((movieObj) => {
          return <Movie key={movieObj.id} movie={movieObj}></Movie>;
        })}
      </div>
    );
  }
}

export default Movies;
