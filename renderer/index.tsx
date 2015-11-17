import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk = require('redux-thunk');
import root from './reducers';
import App from './components/app';

const store = applyMiddleware(thunk)(createStore)(root);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
);

