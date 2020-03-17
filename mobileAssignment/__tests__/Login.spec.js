import 'react-native';
import React from 'react';
import Login from '../screens/Login'
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

describe('My Connected React-Redux Component', () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    })
  })

  it('should render with given state from Redux store', () => {
    expect(renderer.create(
      <Provider store={store}>
        <Login/>
      </Provider>
    ).toJSON()).toMatchSnapshot()

  })
})