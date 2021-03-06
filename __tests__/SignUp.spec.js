import 'react-native';
import React from 'react';
import SignUp from '../screens/SignUp'

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

describe('SignUp Component', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    })
  })

  it('SignUp component should render and match snapshot', () => {
    expect(renderer.create(
      <Provider store={store}>
        <SignUp/>
      </Provider>
    ).toJSON()).toMatchSnapshot()

  })
})