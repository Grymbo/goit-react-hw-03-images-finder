import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/UI/Button/Button";

class App extends Component {
  state = {
    fetchingData: "",
    page: 1,
  };

  inputDataHandler = (searchData) => {
    this.setState({
      fetchingData: searchData,
    });
  };

  changePage = (pageNumber) => {
    this.setState({
      page: pageNumber,
    });
  };

  render() {
    return (
      <>
        <Searchbar inputData={this.inputDataHandler} />

        {this.state.fetchingData && (
          <>
            <ImageGallery
              inputData={this.state.fetchingData}
              page={this.state.page}
            />
            <Button changePage={this.changePage} />
          </>
        )}
      </>
    );
  }
}

export default App;
