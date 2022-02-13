import React from "react";
import AppBar from "@mui/material/AppBar";
import AlbumModal from './AlbumModal';
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import {useState, useEffect} from 'react';

const card = {
    marginTop: '10px',
    marginBottom : '10px',
    minWidth: '100px',
    maxHeight: '48px',
    backgroundColor: 'rgba(255, 255, 255, 0.634)',
    padding: '5px',
}

function Albums({ getAlbumName}) {
    const initialAlbums = JSON.parse(window.localStorage.getItem('albums')) || [];
    const [albums, setAlbums] = useState(initialAlbums);
    const [index, setIndex] = useState(0);
    const [newAlbum, setNewAlbum] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        window.localStorage.setItem('albums', JSON.stringify(albums));
        console.log('after updating local storage')
    }, [albums])

    const addAlbum = (e) => {
        e.preventDefault()
        setAlbums([{name: newAlbum, images: []}, ...albums])
        setNewAlbum('')
    }

    const deleteAlbum = (e) => {
        const updated = albums.filter(alb => alb.name !== e.target.id);
        console.log(updated)
        setAlbums(updated)
        handleClose()
    }

    const handleAlbumClick = (e) => {
        setIndex(e.target.id)
        handleOpen()
    }

    const handleDelete = (e) => {
        albums[index].images.splice(e.target.id, 1);
        const updated = albums;
        setAlbums(updated)
    }
    return (
        <>
        <AlbumModal open={open} 
            album={albums[index]}
            handleClose={handleClose}
            handleDelete={handleDelete}
            deleteAlbum = {deleteAlbum}
        />
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 , backgroundColor: 'rgba(0, 0, 0, 0.250)', overflowX: 'scroll'}}>
            <Stack direction="row" spacing={2}>
                <Card 
                    sx={{
                        marginTop: '10px',
                        marginBottom : '10px',
                        padding: '5px',
                        minWidth: '220px',
                        marginLeft: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.834)',
                        }}>
                    <form noValidate onSubmit={addAlbum}>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                label="add new album"
                                variant="outlined"
                                size="small"
                                sx={{width:'150px'}}
                                onChange={(e) => setNewAlbum(e.target.value)}
                                />
                            <Button variant="contained" onClick={addAlbum}>Add</Button>
                        </Stack>
                    </form>
                </Card> 
                {albums.map((album, index) => (
                    <Card style={card} id={index} onClick={handleAlbumClick}>
                            <Typography component="p">
                                {album.name}
                            </Typography>
                            <Typography component="span">
                                ({album.images.length})
                            </Typography>
                    </Card>    
                ))}
            </Stack>
        </AppBar>
        </>
    )
}

export default Albums;