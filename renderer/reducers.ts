import assign = require('object-assign');
import * as Immutable from 'immutable';
import {ActionType, Kind} from './actions';
import Body from './body';
import log from './log';

const ThisWindow: GitHubElectron.BrowserWindow = global.require('remote').getCurrentWindow();

export interface StateType {
    body: Body;
    candidates: Immutable.Map<string, Candidate[]>;
    booster_inputs: Immutable.Map<string, string>;
}

const init: StateType = {
    body: new Body(),
    candidates: Immutable.Map<string, Candidate[]>(),
    booster_inputs: Immutable.Map<string, string>(),
};

function adjustWindowToContent(state: StateType) {
    const bottom_frame = document.querySelector('.frame-bottom') as HTMLDivElement;
    const height = bottom_frame.offsetTop + bottom_frame.clientHeight;
    const width = ThisWindow.getSize()[0];
    ThisWindow.setSize(width, height);
    return state;
}

function emitQuery(state: StateType, input: string) {
    state.body.query(input);
    return state;
}

function receiveQueryResult(state: StateType, booster_name: string, input: string, candidates: Candidate[]) {
    const next_state = assign({}, state);

    const prev_input = state.booster_inputs.get(booster_name);
    if (!prev_input || prev_input !== input) {
        next_state.candidates = state.candidates.set(booster_name, candidates);
        next_state.booster_inputs = state.booster_inputs.set(booster_name, input);
    } else {
        next_state.candidates
            = state.candidates.update(
                    booster_name,
                    [] as Candidate[], // default value
                    cs => {
                        cs.push.apply(cs, candidates);
                        return cs;
                    }
                );
    }

    return next_state;
}

export default function root(state: StateType = init, action: ActionType) {
    log.info('action type: ', action.type);
    log.debug('action: ', action);
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
