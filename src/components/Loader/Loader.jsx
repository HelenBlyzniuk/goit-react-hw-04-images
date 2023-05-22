import { CirclesWithBar } from 'react-loader-spinner';
import React from 'react';

export const Loader = () => {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
      wrapperClass=""
      visible={true}
      outerCircleColor="blue"
      innerCircleColor="blue"
      barColor="blue"
      ariaLabel="circles-with-bar-loading"
    />
  );
};
