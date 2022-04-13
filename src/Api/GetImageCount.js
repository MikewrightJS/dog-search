import axios from "axios";

const GetImageCount = async (obj) => {
    const {selectedBreed, selectedSubBreed} = obj;
    try {
        const url = selectedSubBreed ? `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images` : `https://dog.ceo/api/breed/${selectedBreed}/images`;
       const result = await axios.get(url);
       const data = result.data.message
       return data.length > 0 ? data.length: false;
    } catch (error) {
        // If we had a logging server, we'd also log this error
       return false;
    }
}

export default GetImageCount