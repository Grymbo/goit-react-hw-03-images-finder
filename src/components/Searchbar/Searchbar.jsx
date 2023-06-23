import React, { Component } from "react";
import api from "../../services/api";
import classes from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    data: "",
  };

  onInputChange = (e) => {
    this.setState({
      data: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.inputData(this.state.data);
    this.restore();
  };

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
