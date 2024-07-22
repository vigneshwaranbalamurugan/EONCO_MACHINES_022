import React from 'react';
import '../styles/Loader.css'; // Create and import a CSS file for the loader styles

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
