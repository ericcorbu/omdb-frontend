import React, { Component } from "react";
import { InputGroup, Form, Badge } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { getSearchResults, getMovieById } from "../utils/ResultsProvider";
import MovieCard from "./ListItem";
import InfiniteScroll from "react-infinite-scroller";
import MovieInfo from "./MovieInfo";
import NominationsList from "./NominationsList";
import Intro from "./Intro";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import "./ListView.css";

// TODO Top Genres
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: React.createRef(),
      listData: [],
      filters: [],
      selectedItem: null,
      selectedData: null,
      page: 1,
      maxPages: 100,
      totalResults: null,
      showList: false,
    };
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.addToNominatons = this.addToNominatons.bind(this);
    this.onClear = this.onClear.bind(this);
    this.removeSingle = this.removeSingle.bind(this);
  }

  async onSearchChange() {
    if (this.state.searchTerm.current.value == "") {
      this.setState({ listData: [], totalResults: null });
    } else {
      const results = await getSearchResults(
        this.state.searchTerm.current.value,
        1
      );

      if (results.Response === "True") {
        // console.log(results)
        const items = results.Search;
        const pages = Math.floor(parseInt(results.totalResults) / 10) + 1;
        // console.log(pages)
        this.setState({
          listData: items,
          page: 1,
          maxPages: pages,
          totalResults: results.totalResults,
        });
      } else {
        this.setState({
          listData: [],
          page: 1,
          maxPages: 100,
          totalResults: null,
        });
      }
    }
  }

  async handleLoadMore(page) {
    const results = await getSearchResults(
      this.state.searchTerm.current.value,
      page
    );
    // console.log(results)
    // console.log("current page" + page)
    if (results.Response === "True") {
      const items = results.Search;
      this.state.listData = this.state.listData.concat(items);
      this.setState({ page: page });
    }
  }

  onSelected(e) {
    const listContainer = document.getElementById("listDiv");
    if (listContainer) {
      listContainer.style.width = "50%";
    }
    getMovieById(e).then((item) => {
      this.setState({ selectedItem: e, selectedData: item });
    });
  }
  addToNominatons(movie) {
    // console.log(movie);
    const currentNominations = localStorage.getItem("nominations");
    console.log(currentNominations);
    if (currentNominations) {
      const parsed = JSON.parse(currentNominations);
      console.log(parsed);
      if (Object.keys(parsed).length < 5) {
        parsed[movie.imdbID] = movie;
        localStorage.setItem("nominations", JSON.stringify(parsed));
      }
    } else {
      const nominations = {};
      nominations[movie.imdbID] = movie;

      localStorage.setItem("nominations", JSON.stringify(nominations));
    }
    this.forceUpdate();
    // inStorage.forEach((item) => console.log(item));
  }

  onClear() {
    localStorage.setItem("nominations", JSON.stringify({}));
    this.setState({ showList: true });
  }

  removeSingle(id) {
    console.log("removeSingle called!");
    const currentItems = JSON.parse(localStorage.getItem("nominations"));
    delete currentItems[id];
    localStorage.setItem("nominations", JSON.stringify(currentItems));
    this.setState({ showList: true });
  }

  render() {
    // console.log(this.state.searchTerm)

    const hitCounter = this.state.totalResults ? (
      <Badge>{this.state.totalResults} results</Badge>
    ) : null;

    const inStorage = localStorage.getItem("nominations") || null;

    const nominations = inStorage ? JSON.parse(inStorage) : null;
    const isFull = nominations ? Object.keys(nominations).length === 5 : false;
    const listItems =
      this.state.listData.length > 0
        ? this.state.listData.map((movieData) => (
            <MovieCard
              data={movieData}
              key={movieData.imdbID}
              onSelected={this.onSelected}
              onNomination={this.addToNominatons}
              isNominated={
                nominations ? !!nominations[movieData.imdbID] : false
              }
              isFull={isFull}
            />
          ))
        : null;

    // console.log(Object.entries(inStorage));
    const introJumb =
      this.state.searchTerm?.current?.value == null ||
      this.state.searchTerm.current.value == "" ? (
        <Intro />
      ) : null;
    const nominationList =
      Object.keys(nominations || {}).length > 0 || this.state.showList ? (
        <NominationsList
          nominations={nominations}
          onClear={this.onClear}
          removeOne={this.removeSingle}
          setSelected={this.onSelected}
        />
      ) : null;

    const selectedMovie = this.state.selectedData ? (
      <MovieInfo
        data={this.state.selectedData}
        onNomination={this.addToNominatons}
        isNominated={
          nominations ? !!nominations[this.state.selectedData.imdbID] : false
        }
      />
    ) : null;
    // console.log(this.state.page);
    // console.log(this.state.listData);
    return (
      <div>
        <div className="listViewContainer">
          <br />

          <div id="listDiv">
            <Form className="searchBar">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <Search />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="search"
                  ref={this.state.searchTerm}
                  onChange={this.onSearchChange.bind(this)}
                  placeholder="Search"
                  className="searchBar"
                />
              </InputGroup>
            </Form>
            {introJumb}
            {hitCounter}
            <br />
            <div className="list">
              <InfiniteScroll
                className="scrollThing"
                pageStart={1}
                loadMore={this.handleLoadMore}
                hasMore={this.state.listData.length < this.state.totalResults}
                loader={
                  <div className="loader" key={0}>
                    <Spinner animation="border" />
                    <h1> Loading ...</h1>
                  </div>
                }
                useWindow={false}
                threshold={600}
              >
                {listItems}
              </InfiniteScroll>
            </div>
          </div>
          <div className="rightPanel">
            {nominationList}
            {selectedMovie}
          </div>
        </div>
        <a className="github" href="https://github.com/ericcorbu/omdb-frontend">
          View on GitHub
        </a>
        <Toast className="theToast" show={isFull}>
          <Toast.Header>Congrats!</Toast.Header>
          <Toast.Body>
            You have selected 5 movies, completing your nomination list! Remove
            a movie or clear your list to continue editing your list.
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default ListView;
