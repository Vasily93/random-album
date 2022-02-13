import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function AddButton({ albumsList, url, getTitleAndUrl }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleTitleClick = (e) => {
    getTitleAndUrl({title: e.target.innerText, url: url})
  }

  return (
    <div>
      <Fab size="small" variant="extended" onClick={handleClick} >
          Add To ...
      </Fab>     
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{p: 1, bgcolor: 'background.paper' }}>
          <List>
              {albumsList.map(title => (
                <ListItem disablePadding>
                <ListItemButton onClick={handleTitleClick}>
                    <ListItemText primary={title}/>
                </ListItemButton>
              </ListItem>  
              ))}
          </List>
        </Box>
      </Popper>
    </div>
  );
}

export default AddButton;