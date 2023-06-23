import React, { Component } from "react";

class Button extends Component {
  state = {
    pageNumber: 1,
  };

  onClickHandler = () => {
    this.setState(
      (prevState) => {
        return { pageNumber: prevState.pageNumber + 1 };
      },
      () => {
        this.props.changePage(this.state.pageNumber);
      }
    );
  };

  render() {
    return (
      <button type="button" onClick={this.onClickHandler}>
        Load more
      </button>
    );
  }
}

export default Button;
