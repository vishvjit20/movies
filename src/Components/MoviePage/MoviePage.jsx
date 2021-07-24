import React, { Component } from "react";
import axios from "axios";
import "./MoviePage.css";
import { API_URL, API_KEY } from "../../API/secrets";
import YouTube from "react-youtube";

class MoviePage extends Component {
  state = {
    videoObject: {},
  };

  async componentDidMount() {
    // https://api.themoviedb.org/3/movie/324552/videos?api_key=e0729d9fd2895e69ef449cee48384288&language=en-US
    let response = await axios.get(
      `${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`
    );
    // console.log(response.data);
    let videoObject = response.data.results.filter((videoObj) => {
      if (videoObj.type === "Trailer" && videoObj.site === "YouTube")
        return true;
      return false;
    });

    this.setState({
      videoObject: videoObject[0],
    });
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1,
      },
    };

    let { title, tagline, vote_average, poster_path, overview } =
      this.props.location.state;
    return (
      <div className="movie-page">
        <div className="movie-page-poster">
          <img src={poster_path} alt="" />
        </div>
        <div className="movie-page-details">
          <div className="movie-title-info">
            <h1>
              {title} {vote_average} IMDB
            </h1>
            <span>{tagline}</span>
            <p>{overview}</p>
          </div>
          <div className="movie-trailer">
            <YouTube videoId={this.state.videoObject.key} opts={opts}></YouTube>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviePage;
