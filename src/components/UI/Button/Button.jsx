import React, { Component } from "react";

class Button extends Component {

  // Iniciamos el Estado del componente y lo inicializamos en 1
  state = {
    pageNumber: 1,
  };
  
  // Se ejecutara cuando se de click en el elemento
  onClickHandler = () => {
    //Actualizamos el estado del componente
    this.setState((prevState) => { // La función toma el estado anterior (prevState) y devuelve un nuevo objeto de estado con la propiedad pageNumber incrementada en 1.
        return { pageNumber: prevState.pageNumber + 1 };
      },() => {
        this.props.changePage(this.state.pageNumber);
      }
    );
  };

  render() {
    // Creamos un boton al momento de buscar un tipo de imagenes
    return (
      <button type="button" onClick={this.onClickHandler}>
        Load more
      </button>
    );
  }
}

export default Button;
