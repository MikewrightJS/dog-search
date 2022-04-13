import React, { useState, useEffect } from 'react';
import './App.css';
import GetBreedList from './Api/GetBreedList'
import Search from './Components/Search'
import Images from './Components/Images'
import {Container} from '@mui/material';
import {useSelector} from 'react-redux';



function App() {
  const [apiError, setApiError]= useState(false);
  const [breedList, setBreedList] = useState(false)
  const imagesState = useSelector(state => state.imagesFromApi);

  console.log(imagesState)
  useEffect(() => {
    GetBreedList().then((response) => {
      if (response) {
        setBreedList(response.data.message)
      } else {
        setApiError('Unable to load API')
      }
    })
  }, []);

  return (
    <Container sx={{paddingTop:3}} maxWidth="md">
      {breedList && <Search breeds={breedList}/>}
      {<Images images={imagesState} />}
    </Container>
  );
}

export default App;
