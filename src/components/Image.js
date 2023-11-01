import React from 'react';

const Image = ({ image }) => {
  return (
    <div className="image">
      <img src={image.url} alt={image.alt} />
      {/* Add additional features, e.g., checkbox for selecting, and styles */}
    </div>
  );
};

export default Image;
