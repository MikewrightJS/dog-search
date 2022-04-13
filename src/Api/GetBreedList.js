import axios from "axios";

const GetBreedList = async () => {
    try {
        return await axios.get('https://dog.ceo/api/breeds/list/all');
    } catch (error) {
        // If we had a logging server, we'd also log this error
       return false;
    }
}

export default GetBreedList