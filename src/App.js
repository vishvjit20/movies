import React, { Component } from "react";
import Header from "./Components/Header/header";
import Movies from "./Components/Movies/movies";
import axios from "axios";
import { API_KEY, API_URL } from "./API/secrets";
import Pagination from "./Components/Pagination/Pagination";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Favourite from "./Components/Favourite/Favourite";
import MoviePage from "./Components/MoviePage/MoviePage";

class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "batman",
    pages: [],
    currPage: 1,
  };

  async componentDidMount() {
    //API call

    let data = await axios.get(API_URL + "/search/movie/", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });

    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages;
    let pages = [];

    for (let i = 1; i < pagesCount; i++) {
      pages.push(i);
    }

    this.setState({
      moviesData: moviesData,
      pages: pages,
    });
  }
  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie/", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages;
    let pages = [];

    for (let i = 1; i < pagesCount; i++) {
      pages.push(i);
    }

    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  };

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie/", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage + 1,
        query: this.state.currentMovie,
      },
    });

    let moviesData = data.data.results.slice(0, 10);

    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1,
    });
  };

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie/", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage - 1,
        query: this.state.currentMovie,
      },
    });

    let moviesData = data.data.results.slice(0, 10);

    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1,
    });
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie/", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });

    let moviesData = data.data.results.slice(0, 10);

    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header setMovies={this.setMovies}></Header>
          <Switch>
            <Route path="/" exact>
              {this.state.moviesData.length ? (
                <React.Fragment>
                  <Movies movies={this.state.moviesData}></Movies>
                  <Pagination
                    pages={this.state.pages}
                    currPage={this.state.currPage}
                    nextPage={this.nextPage}
                    previousPage={this.previousPage}
                    setPage={this.setPage}
                  ></Pagination>
                </React.Fragment>
              ) : (
                <h1>Oops! No movies found</h1>
              )}
            </Route>

            <Route path="/fav" exact>
              {" "}
              <Favourite></Favourite>
            </Route>

            <Route path="/moviepage" exact component={MoviePage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
