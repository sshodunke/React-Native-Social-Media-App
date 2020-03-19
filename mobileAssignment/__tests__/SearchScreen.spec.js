import 'react-native';
import React from 'react';
import SearchScreen from '../screens/SearchScreen'

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';


describe('SearchScreen Component', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    })
  })

  it('SearchScreen component should render and match snapshot', () => {
    expect(renderer.create(
      <Provider store={store}>
        <SearchScreen/>
      </Provider>
    ).toJSON()).toMatchSnapshot()

  })
})