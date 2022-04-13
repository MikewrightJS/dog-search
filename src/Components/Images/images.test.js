import { render, waitFor  } from '@testing-library/react';
import {createStore} from 'redux';
import allReducers from '../../Reducers';
import {Provider} from 'react-redux';
import GetImagesFromApi from '../../Data/testGetImagesFromApi.json';
import Images from './'



const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

describe('Images component', () => {
    it('Selecting a breed and number of images will return images', async () => {
        const { getByAltText } = render(<Provider store={store}><Images images={GetImagesFromApi} /> </Provider>);
            // Would have set up a mock api library to test calling the api instead of using dummy JSON data, but time restraints.

        expect( await waitFor(() => getByAltText('Pupper pics 1'))).toBeInTheDocument();
    });

    it('If no images are stored in the image state then ask the user to search', async () => {
        const { getByText } = render(<Provider store={store}><Images images={false} /> </Provider>);
        const errorMessage = await waitFor(() => getByText('Please select the options above to generate images'));
        expect(errorMessage).toBeInTheDocument();
    });
});


