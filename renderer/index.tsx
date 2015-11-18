import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import Store from './store';

ReactDOM.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
);

