import React, { Component } from "react";

import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import api from "../../services/api";
import classes from "./ImageGallery.module.css";

import Masonry from "@mui/lab/Masonry";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";

import { createPortal } from "react-dom";

// Obtener una referencia al elemento del DOM con el id "portal"
const portalElement = document.getElementById("portal");

class ImageGallery extends Component {
  state = {
    fetchData: [],
    sorce: "",
    showModal: false,
    showLoader: true,
  };

  // Mediante toast mandamos el mensaje "error on fetching data"
  error = () => toast.error("error on fetching data");

  // Mandamos un msj de advertencia, igual utilizando la libreria de toast y agregamos un pequeño emoji
  warning = () =>
    toast("I cant find anything with this query", {
      icon: "☠️",
    });
  
  /* Función asíncrona que utiliza la sintaxis async componentDidMount() {}
      Este método se ejecuta después de que el componente ha sido montado en el DOM
      y es un buen lugar para realizar llamadas a API u otras operaciones asíncronas.*/
  async componentDidMount() {
    let data = [];

    // Se utiliza un bloque try-catch para manejar cualquier error que pueda ocurrir durante la ejecución del código.
    try {
      data = await this.fetchingData();// La palabra clave await se utiliza para esperar a que la función fetchingData() se complete y devuelva un resultado antes de continuar con la ejecución del código.
      this.setState({
        fetchData: [...data],
      });
    } 
    
    // Si ocurre un error, muestra una notificacion de error
    catch (error) {
      this.error();
    } 
    
    // Se ejecuta independientemente si hay un error o no, despuies manda un mesnaje de warning
    finally {
      if (data.length === 0) {
        this.warning();
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.page != this.props.page) {
      const data = await this.fetchingData();
      this.setState({
        fetchData: [...this.state.fetchData, ...data],
      });
    }

    if (prevProps.inputData !== this.props.inputData) {
      const data = await this.fetchingData();
      console.log(data);
      if (data.length === 0) {
        this.warning();
      }
      this.setState({
        fetchData: [...data],
      });
    }
  }

  fetchingData = async () => {
    this.setState({
      showLoader: true,
    });
    try {
      api.query = this.props.inputData;
      api.page = this.props.page;
      const fetchData = await api.fetch();
      this.setState({ showLoader: false });

      return fetchData;
    } catch (error) {
      this.error();
    } finally {
      this.setState({
        showLoader: false,
      });
    }
  };

  clickedElementHandler = (e) => {
    const sorce = e.target.getAttribute("data-sorce");
    if (sorce) {
      this.setState({
        sorce: sorce,
        showModal: true,
      });
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <div className={classes.wrapper} onClick={this.clickedElementHandler}>
        <Masonry columns={4} spacing={5} key="masonry">
          <ImageGalleryItem fetchData={this.state.fetchData} />
        </Masonry>
        {createPortal(
          <Modal
            open={this.state.showModal}
            onClose={this.closeModal}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={this.state.sorce}
              alt="modalImg"
              style={{
                width: "50%",
                height: "50%",
                objectFit: "cover",
                border: "none",
                filter: "none",
                transform: "none",
                cursor: "none",
              }}
            />
          </Modal>,
          portalElement
        )}
        {createPortal(
          <Backdrop
            sx={{
              color: "#646cff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={this.state.showLoader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>,
          portalElement
        )}
        {createPortal(<Toaster />, portalElement)}
      </div>
    );
  }
}

export default ImageGallery;
