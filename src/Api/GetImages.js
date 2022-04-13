import axios from "axios";

const GetImages = async (obj) => {
    const {selectedBreed, selectedSubBreed, imageQuantity} = obj;
    try {
        const url = selectedSubBreed ? `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images/random/${imageQuantity}` : `https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageQuantity}`;
       const result = await axios.get(url);
       const data = result.data.message
       return data.length > 0 ? data : false;
    } catch (error) {
        // If we had a logging server, we'd also log this error
       return false;
    }
}

export default GetImages