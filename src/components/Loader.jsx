import React from 'react';
import { Bars } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <Bars color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default Loader;