import React from 'react';

const ImageBox = (props) => {
  return <div>
      <img src={props.url} alt={`source from ${props.url}`} ></img>
  </div>;
};

export default ImageBox;