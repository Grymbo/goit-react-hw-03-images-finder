import React, { Component } from "react";
import api from "../../services/api";
import classes from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    data: "",
  };

  /*Se encarga de actualizar el estado del componente con el valor actual del campo de entrada. 
  Esto permite que el componente capture y mantenga un seguimiento del valor ingresado 
  por el usuario en el campo de entrada.*/
  onInputChange = (e) => {
    this.setState({
      data: e.target.value,
    });
  };

  /*Se encarga de capturar el evento de envío del formulario, 
  ejecutar una función proporcionada a través de las props del componente (inputData) 
  con el valor actual del campo de entrada (this.state.data), 
  y realizar cualquier otra acción necesaria después del envío del formulario.*/
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.inputData(this.state.data);
    this.restore();
  };

  /*Se utiliza para restablecer el estado de data del componente a una cadena vacía, 
  lo que es útil después de enviar un formulario o completar una acción específica*/
  restore = () => {
    this.setState({ data: "" });
  };

  render() {
    const { data } = this.state;
    return (
      <header className={classes.searchbar}>
        <form className={classes.form} onSubmit={this.onSubmitHandler}>
          <button type="submit" className={classes.button}>
            <span className={classes["button-label"]}>Search</span>
          </button>

          <input
            value={data}
            className={classes.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
