import { Component } from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../API/secrets";
import "./movie.css";

class Movie extends Component {
  state = {};

  componentDidMount() {}

  render() {
    let { poster_path, title, vote_average } = this.props.movie;
    let posterPath = IMAGE_URL + poster_path;
    return (
      <div className="movie-item">
        <div className="movie-poster">
          <Link to={{ pathname: "/moviepage", state: { foo: "bar" } }}>
            <img src={posterPath} alt="" />
          </Link>
        </div>
        <div className="movie-info">
          <div className="movie-title">{title}</div>
          <div className="movie-rating">{vote_average} IMDB</div>
        </div>
      </div>
    );
  }
}

export default Movie;
