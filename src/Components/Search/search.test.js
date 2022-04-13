import { render, screen, waitFor, fireEvent, getByAltText } from '@testing-library/react';
import {createStore} from 'redux';
import allReducers from '../../Reducers';
import {Provider} from 'react-redux';
import Search from '../Search';
import GetBreedList from '../../Data/testBreedList.json';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

describe('Search component', () => {
    it('If breed has sub breed, then show sub breed dropdown', async () => {
        const { getByText, getByTestId } = render(<Provider store={store}><Search breeds={GetBreedList}/> </Provider>);
        await waitFor(() => getByText('Search'));
        const breedDropdown = await waitFor(() => getByTestId('select-breed'));
        fireEvent.mouseDown(breedDropdown.childNodes[0]);
        const bulldog = getByText('bulldog');
        fireEvent.click(bulldog);
        const subBreed = await waitFor(() => getByTestId('select-sub-breed'));
        expect(subBreed).toBeInTheDocument();
    });

    it('Presents an error if you try to search without defining amount of images', async () => {
        const { getByText, getByTestId } = render(<Provider store={store}><Search breeds={GetBreedList}/> </Provider>);
        await waitFor(() => getByText('Search'));
        const breedDropdown = await waitFor(() => getByTestId('select-breed'));
        fireEvent.mouseDown(breedDropdown.childNodes[0]);
        const boxer = getByText('boxer');
        fireEvent.click(boxer);
        const search = await waitFor(() => getByTestId('submit-search'));
        fireEvent.click(search);
        const errorMessage = await waitFor(() => getByText('Please select a quantity of images'));
        expect(errorMessage).toBeInTheDocument();
    });

    it('Not selecting a breed will result in an error', async () => {
        const { getByText, getByTestId } = render(<Provider store={store}><Search breeds={GetBreedList}/> </Provider>);
        await waitFor(() => getByText('Search'));
        const search = await waitFor(() => getByTestId('submit-search'));
        fireEvent.click(search);
        const errorMessage = await waitFor(() => getByText('Please select a breed'));
        expect(errorMessage).toBeInTheDocument();
    });
});
