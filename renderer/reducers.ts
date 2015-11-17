import assign = require('object-assign');
import * as Immutable from 'immutable';
import {ActionType} from './actions';
import Body from './body';

export interface StateType {
    body: Body;
}

const init: StateType = {
    body: new Body(),
};

export default function root(state: StateType = init, action: ActionType) {
    console.log('action: ', action.type);
    return state;
}
