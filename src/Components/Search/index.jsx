import React, {useState } from 'react';
import styles from "./styles.module.css";
import { Box } from '@mui/system';
import {FormControl,InputLabel, Select, MenuItem, Button,FormHelperText } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useDispatch} from 'react-redux';
import GetSubBreedList from '../../Api/GetSubBreedList'
import GetImages from '../../Api/GetImages'
import GetImageCount from '../../Api/GetImageCount'
import {getImagesFromApi} from '../../Actions'

const Search = (breeds) => {

const [selectedBreed, setSelectedBreed] = useState('')
const [subBreedList, setSubBreedList] = useState(false)
const [imageQuantity, setImageQuantity] = useState('')
const [maxAmountofImages, setMaxAmountOfImages] = useState(false)
const [imageQuantityHasError, setImageQuantityHasError] = useState(false)
const [imageQuantityHelperText, setImageQuantityHelperText] = useState(false)
const [breedHasError, setBreedHasError] = useState(false)
const [breedHelperText, setBreedHelperText] = useState(false)
const [selectedSubBreed, setSelectedSubBreed] = useState('')

const dispatch = useDispatch();

    const handleBreedChange = (event) => {
        setSelectedBreed(event.target.value)
        setSelectedSubBreed('')
        setSubBreedList(false)
        setImageQuantity('')
        setMaxAmountOfImages(false)
        GetSubBreedList(event.target.value).then((response) => {
            GetImageCount({selectedBreed:event.target.value, selectedSubBreed:false}).then((response) => {
                if (response) {
                    setMaxAmountOfImages(response)
            }})
            if (response) {
                setSubBreedList(response)
            }
        })
    }

    const handleSubBreedChange = (event) => {
        setImageQuantity(1)
        setMaxAmountOfImages(false)
        GetImageCount({selectedBreed:selectedBreed, selectedSubBreed:event.target.value}).then((response) => {
            if (response) {
                setMaxAmountOfImages(response)
        }})
        setSelectedSubBreed(event.target.value)
    }

    const handleImages = (event) => {
        setImageQuantity(event.target.value)
    }

    const searchImages = () => {
        if(imageQuantity > 0 && selectedBreed != ''){
            setImageQuantityHasError(false)
            setImageQuantityHelperText("")
            setBreedHasError(false)
            setBreedHelperText("")
            GetImages({selectedBreed:selectedBreed, selectedSubBreed:selectedSubBreed, imageQuantity:imageQuantity}).then((response) => {
                if (response) {
                    dispatch(getImagesFromApi(response))
                }
            })
        }else{
            if(selectedBreed == ""){
                setBreedHasError(true)
                setBreedHelperText("Please select a breed")
            }

             if(imageQuantity <= 0){
                setImageQuantityHasError(true)
                setImageQuantityHelperText("Please select a quantity of images")
            }
            
       
        }
        
    }



    var numberOption = [];
    if(maxAmountofImages){
        for (var i = 1; i <= maxAmountofImages; i++) {
            numberOption.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
    }
    
    return(
        <Box className={styles.search__container}>
             <FormControl  sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="select-breed">Breed</InputLabel>
                            <Select
                                defaultValue = "" 
                                label="Select breed"
                                labelId="select-breed"
                                data-testid= "select-breed"
                                input={<OutlinedInput label="Breed" />}
                                value={selectedBreed}
                                error={breedHasError}
                                onChange={handleBreedChange}
                                >

                           
                            { breeds && Object.keys(breeds.breeds).map((breed,i) =>{
                                    return <MenuItem key={breed} value={breed}>{breed}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText style={{color:"red"}}>{breedHelperText}</FormHelperText>

                </FormControl>
                                
                {subBreedList && <FormControl  sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="select-sub-breed">Sub Breed</InputLabel>
                            <Select
                                defaultValue = "" 
                                label="Select Sub Breed"
                                labelId="select-sub-breed"
                                data-testid= "select-sub-breed"
                                input={<OutlinedInput label="Sub Breed" />}
                                value={selectedSubBreed}
                                onChange={handleSubBreedChange}>
                           
                             {subBreedList.map((breed) =>{
                                return <MenuItem key={breed} value={breed}>{breed}</MenuItem>
                            })}
                            </Select>
                </FormControl> }

                <FormControl  sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="select-breed">Number</InputLabel>
                            <Select
                                defaultValue = "" 
                                label="Select images"
                                labelId="select-images"
                                data-testid= "select-images"
                                input={<OutlinedInput label="Images" />}
                                onChange={handleImages}
                                value={imageQuantity}
                                error={imageQuantityHasError}
                               
                                >
                           
                            {numberOption}

                            </Select>
                            <FormHelperText style={{color:"red"}}>{imageQuantityHelperText}</FormHelperText>

                </FormControl>

                <FormControl  sx={{ m: 1, minWidth: 120 }}>
                    <Button data-testid="submit-search" onClick={searchImages} style={{height:56}} variant="contained">Search</Button>
                </FormControl>
                

          
        </Box>
    );
};

export default Search;