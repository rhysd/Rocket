import assign = require('object-assign');
import * as Immutable from 'immutable';
import {ActionType, Kind} from './actions';
import Body from './body';

const ThisWindow: GitHubElectron.BrowserWindow = global.require('remote').getCurrentWindow();

export interface StateType {
    body: Body;
}

const init: StateType = {
    body: new Body(),
};

function adjustWindowToContent(state: StateType) {
    const bottom_frame = document.querySelector('.frame-bottom') as HTMLDivElement;
    const height = bottom_frame.offsetTop + bottom_frame.clientHeight;
    console.log('height', height);
    const width = ThisWindow.getSize()[0];
    ThisWindow.setSize(width, height);
    return state;
}

export default function root(state: StateType = init, action: ActionType) {
    console.log('action: ', action.type);
    switch (action.type) {
    case Kind.AdjustWindowToContent:
        return adjustWindowToContent(state);
        break;
    default:
        break;
    }
    return state;
}
