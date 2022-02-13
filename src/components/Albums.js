import React from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

const albums = [
    {name: 'People', images: []},
    {name: 'Animals', images: []},
    {name: 'Nature', images: []},
    {name: 'Nature', images: []},
    {name: 'Houses', images: []}
]

const card = {
    marginTop: '10px',
    marginBottom : '10px',
    minWidth: '100px',
    backgroundColor: 'rgba(255, 255, 255, 0.734)',
    padding: '5px'
}

const Albums = () => {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 , backgroundColor: 'rgba(0, 0, 0, 0.250)', overflowX: 'scroll'}}>
            <Stack direction="row" spacing={2}>
                <Card style={card} sx={{marginLeft: '10px'}}>
                    <Button>Add New Album</Button>
                </Card> 
                {albums.map(album => (
                    <Card style={card}>
                        <CardContent>
                            <Typography component="p">
                                {album.name}
                            </Typography>
                            <Typography component="span">
                                ({album.images.length})
                            </Typography>
                        </CardContent>
                    </Card>    
                ))}
            </Stack>
        </AppBar>
    )
}

export default Albums;