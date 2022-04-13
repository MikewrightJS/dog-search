import axios from "axios";

const GetSubBreedList = async (breed) => {
    try {
       const result = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
       const data = result.data.message
       return data.length > 0 ? data : false;
    } catch (error) {
        // If we had a logging server, we'd also log this error
       return false;
    }
}

export default GetSubBreedList