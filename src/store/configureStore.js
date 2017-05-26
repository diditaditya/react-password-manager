import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import passwordReducer from './passwordReducer';

const store = createStore(passwordReducer, applyMiddleware(thunk));

export default store;