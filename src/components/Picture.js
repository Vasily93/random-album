import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { useDrag } from 'react-dnd';

function Picture({image}) {
    const id = image.id;
    const url = image.urls.thumb;
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id, url},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
  return (
    <ImageListItem ref={drag} sx={{ border: isDragging ? '5px solid pink': '0px'}}>
    <img
      src={`${url}?w=164&h=164&fit=crop&auto=format`}
      srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      alt='imagies hardocoded alt text'
      loading="lazy"
    />
  </ImageListItem>
  );
}

export default Picture;
