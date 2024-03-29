import React, { Component } from "react";

import classes from "./ImageGalleryItem.module.css";

// Componente de React que representa un elemento de la galería de imágenes. 
class ImageGalleryItem extends Component {
  render() {
    const { fetchData } = this.props;
    return fetchData.map((img) => {
      return (
        <img
          key={img.id}
          src={img.webformatURL}
          alt={img.tags}
          data-sorce={img.largeImageURL}
          loading="lazy"
        />
      );
    });
  }
}

export default ImageGalleryItem;
