const imagesFromApi = (state = false, action) => {
    switch (action.type) {
        case 'GetImagesFromApi':
            return action.payload;
        default:
            return state
    }
};


export default imagesFromApi;