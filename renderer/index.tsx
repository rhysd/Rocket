import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import Body from './body';

const body = new Body();

ReactDOM.render(
    <App/>,
    document.querySelector('.app')
);

