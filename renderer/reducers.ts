import assign = require('object-assign');
import * as Immutable from 'immutable';
import {ActionType, Kind} from './actions';
import Body from './body';

const ThisWindow: GitHubElectron.BrowserWindow = global.require('remote').getCurrentWindow();

export interface StateType {
    body: Body;
    candidates: Immutable.Map<string, Candidate[]>;
}

const init: StateType = {
    body: new Body(),
    candidates: Immutable.Map<string, Candidate[]>(),
};

function adjustWindowToContent(state: StateType) {
    const bottom_frame = document.querySelector('.frame-bottom') as HTMLDivElement;
    const height = bottom_frame.offsetTop + bottom_frame.clientHeight;
    const width = ThisWindow.getSize()[0];
    ThisWindow.setSize(width, height);
    return state;
}

function emitQuery(state: StateType, input: string) {
    // body.query(input);
    return state;
}

function receiveQueryResult(state: StateType, booster_name: string, input: string, candidates: Candidate[]) {
    const next_state = assign({}, state);
    next_state.candidates = state.candidates.set(booster_name, candidates);
    return next_state;
}

export default function root(state: StateType = init, action: ActionType) {
    console.log('action: ', action.type);
    switch (action.type) {
    case Kind.AdjustWindowToContent:
        return adjustWindowToContent(state);
    case Kind.EmitQuery:
        return emitQuery(state, action.input);
    case Kind.ReceiveQueryResult:
        return receiveQueryResult(state, action.booster_name, action.input, action.candidates);
    default:
        break;
    }
    return state;
}
