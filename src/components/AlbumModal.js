import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
// import { useState } from 'react';

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
            <Stack>
                <h3>{album.title}</h3>
            <Button 
                variant='contained'
                size='small'
                id={album.id}
                onClick={(e) => {deleteAlbum(e)}}
                >Delete Album
            </Button>
            </Stack>
          <ImageList sx={{ width: '100%' }} cols={3} rowHeight={700}>
            {album.images.map((image, index) => (
              <ImageListItem key={`${image.id}-${index}-modal`}>
                <Button variant="contained" id={index} onClick={e => deleteClick(e)} aria-label="delete">
                    <DeleteIcon />
                </Button>
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