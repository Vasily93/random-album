import React from "react";
import AppBar from "@mui/material/AppBar";
import Album from "./Album";
import AlbumModal from './AlbumModal';
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';


function Albums() {
    const initialAlbums = JSON.parse(window.localStorage.getItem('albums')) || [];
    const [albums, setAlbums] = useState(initialAlbums);
    const [albumId, setAlbumId] = useState();
    const [newAlbum, setNewAlbum] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        window.localStorage.setItem('albums', JSON.stringify(albums));
    }, [albums])

    const addAlbum = (e) => {
        e.preventDefault()
        setAlbums([{title: newAlbum, id: uuidv4(), images: []}, ...albums])
        setNewAlbum('')
    }

    const deleteAlbum = (e) => {
        const updated = albums.filter(alb => alb.id !== e.target.id);
        setAlbumId(null)
        handleClose()
        setAlbums(updated)
    }

    const handleAlbumClick = (e) => {
        setAlbumId(e.target.id)
        handleOpen()
    }

    const addImageToAlbum = (id, url) => {
        albums.find(alb => alb.id === id).images.push(url);
        const updatedAlbs = albums
        setAlbums(updatedAlbs)
    }

    const handleDelete = (index, id) => {
        const updatedAlbum = albums.find(alb => alb.id === id);
        updatedAlbum.images.splice(index, 1);
        const updated = albums.map(al => {
            let album = al.id === updatedAlbum.id ?updatedAlbum : al;
            return album;
        })
        setAlbums(updated)

    }

    const modal = albumId ? 
        <AlbumModal open={open} 
            album={albums.find(alb => alb.id === albumId)}
            handleClose={handleClose}
            handleDelete={handleDelete}
            deleteAlbum = {deleteAlbum}
        /> : null;

    const albumsList = albums.length > 0 ?
        albums.map((album, index) => (
            <Album
                key={`${index}-${album.name}`}
                handleAlbumClick={handleAlbumClick}
                album={album}
                addImageToAlbum={addImageToAlbum}
            />
        )) : null;
    
    return (
        <>
        {modal}
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
                                value={newAlbum}
                                size="small"
                                sx={{width:'150px'}}
                                onChange={(e) => setNewAlbum(e.target.value)}
                                />
                            <Button variant="contained" onClick={addAlbum}>Add</Button>
                        </Stack>
                    </form>
                </Card> 
                {albumsList}
            </Stack>
        </AppBar>
        </>
    )
}

export default Albums;