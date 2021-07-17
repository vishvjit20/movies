import { Component } from "react";
import Header from "./Components/Header/header";
import Movies from "./Components/Movies/movies";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secrets";

class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "batman",
  };

  async componentDidMount() {
    //API call

    let data = await axios.get(API_URL + "/search/movie/", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });

    let moviesData = data.data.results;
    this.setState({
      moviesData: moviesData,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Movies movies={this.state.moviesData}></Movies>
      </div>
    );
  }
}

export default App;
