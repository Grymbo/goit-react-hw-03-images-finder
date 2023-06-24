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

  /* Se encarga de actualizar el estado del componente con los datos de búsqueda o 
  entrada proporcionados. Esto se logra mediante la actualización de la propiedad 
  fetchingData del estado del componente.*/
  inputDataHandler = (searchData) => {
    this.setState({
      fetchingData: searchData,
    });
  };

  /*  Se encarga de actualizar el estado del componente con el número de página proporcionado, 
  lo que permite cambiar la página actual en el componente.*/
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
