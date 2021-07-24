import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL, IMAGE_URL, API_KEY } from "../../API/secrets";
import "./movie.css";

class Movie extends Component {
  state = {
    detailedMovieObj: {},
  };
  async componentDidMount() {
    //https://api.themoviedb.org/3/movie/550?api_key=e0729d9fd2895e69ef449cee48384288
    let response = await axios.get(
      `${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`
    );
    let detailedMovieObj = response.data;
    let poster_path = IMAGE_URL + detailedMovieObj.poster_path;
    this.setState({
      detailedMovieObj: {
        ...detailedMovieObj,
        poster_path: poster_path,
      },
    });
  }

  render() {
    let { poster_path, title, vote_average } = this.props.movie;
    let posterPath = IMAGE_URL + poster_path;
    return (
      <div className="movie-item">
        <div className="movie-poster">
          <Link
            to={{ pathname: "/moviepage", state: this.state.detailedMovieObj }}
          >
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
