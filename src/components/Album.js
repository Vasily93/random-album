import React from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const card = {
    marginTop: '10px',
    marginBottom : '10px',
    minWidth: '100px',
    maxHeight: '48px',
    backgroundColor: 'rgba(255, 255, 255, 0.634)',
    padding: '5px',
}

function Album({ handleAlbumClick, album, addImageToAlbum}) {
    const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToAlbum(album.id, item.url),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

  return (
    <Card ref={drop} style={card} id={album.id} onClick={handleAlbumClick}>
    <Typography component="p">
        {album.title}
    </Typography>
    <Typography component="span">
        ({album.images.length})
    </Typography>
</Card> 
  );
}

export default Album;
