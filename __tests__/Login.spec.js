import 'react-native';
import React from 'react';
import Login from '../screens/Login'

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

describe('Login Component', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    })
  })

  it('Login component should render and match snapshot', () => {
    expect(renderer.create(
      <Provider store={store}>
        <Login/>
      </Provider>
    ).toJSON()).toMatchSnapshot()

  })
})