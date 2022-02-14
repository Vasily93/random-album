import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useState } from 'react';

const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll'
  };


function AlbumModal(props) {
    const {album, open, handleClose, handleDelete, deleteAlbum} = props;

    const deleteClick = (e) => {
        handleDelete(e.target.id, album.id)
    }
return (
    <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={modalstyle}>
            <button id={album.id}  onClick={(e) => {deleteAlbum(e)}}>Delete Album</button>
            <h1>{album.title}</h1>
          <ImageList sx={{ width: '100%' }} cols={2} rowHeight={500}>
            {album.images.map((image, index) => (
              <ImageListItem >
                  <button id={index} onClick={e => deleteClick(e)}>delete</button>
                <img
                  src={`${image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt='imagies hardocoded alt text'
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        </Modal>


)
}

export default AlbumModal;