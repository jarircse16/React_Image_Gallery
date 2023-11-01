import React from 'react';
import Image from './Image';

const ImageList = ({ images }) => {
  return (
    <div className="image-list">
      {images.map((image, index) => (
        <Image key={index} image={image} />
      ))}
    </div>
  );
};

export default ImageList;
