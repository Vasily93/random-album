import './App.css';
// import Loader from './components/Loader';
import Header from './components/Header';
import Albums from './components/Albums';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import {useState, useEffect} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


function App() {
  const [images, setImages] = useState([]);
  const fetchTenMoreImages = () => {
    const apiRoot = 'https://api.unsplash.com';
    const API_Key = process.env.REACT_APP_API_KEY;

    axios
        .get(`${apiRoot}/photos/random?client_id=${API_Key}&count=10`)
        .then(res => setImages([...images, ...res.data]))
  }

  useEffect(() => {
    if(images.length === 0) {
      fetchTenMoreImages()
    }
  })


  return (
    <div className="App">
      <Header title='Infinite Scroll'/>

      <Container>
        <InfiniteScroll 
          dataLength={images.length} 
          hasMore={images.length < 20}
          loader={'Loading more Images...'}
          next={fetchTenMoreImages}  
        >
          <ImageList sx={{ width: '100%' }} cols={4} rowHeight={500}>
            {images.map(image => (
              <ImageListItem key={image.id} >
                <img
                  src={`${image.urls.thumb}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image.urls.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt='imagies hardocoded alt text'
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </InfiniteScroll>
        {/* <AlbumModal open={open} title={albumTitle} images={album} handleClose={handleClose}/> */}
      </Container>

      <Albums />
    </div>
  );
}

export default App;
