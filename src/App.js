import './App.css';
// import Loader from './components/Loader';
import Header from './components/Header';
import Albums from './components/Albums';
import Picture from './components/Picture';
import ImageList from '@mui/material/ImageList';
import Container from '@mui/material/Container';
import {useState, useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    <DndProvider backend={HTML5Backend}>
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
              <Picture  image={image} />
            ))}
          </ImageList>
        </InfiniteScroll>
      </Container>

      <Albums />
    </div>
    </DndProvider>
  );
}

export default App;
