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
    page: number;
    items_per_page: number;
    max_page: number;
}

const init: StateType = {
    body: new Body(),
    candidates: Immutable.Map<string, Candidate[]>(),
    booster_inputs: Immutable.Map<string, string>(),
    page: 0,
    items_per_page: 10,
    max_page: 0,
};

function adjustWindowToContent(state: StateType) {
    'use strict';
    const bottom_frame = document.querySelector('.frame-bottom') as HTMLDivElement;
    const height = bottom_frame.offsetTop + bottom_frame.clientHeight;
    const width = ThisWindow.getSize()[0];
    ThisWindow.setSize(width, height);
    return state;
}

function emitQuery(state: StateType, input: string) {
    'use strict';
    state.body.query(input);
    return state;
}

function receiveQueryResult(state: StateType, booster_name: string, input: string, candidates: Candidate[]) {
    'use strict';
    const next_state: StateType = assign({}, state);

    const prev_input = state.booster_inputs.get(booster_name);
    if (!prev_input || prev_input !== input) {
        next_state.candidates = state.candidates.set(booster_name, candidates);
        next_state.booster_inputs = state.booster_inputs.set(booster_name, input);
        next_state.page = 0;
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

    next_state.max_page = Math.floor(
        next_state.candidates.reduce((acc, cs) => acc + cs.length, 0) / state.items_per_page
    );

    return next_state;
}

function jumpPage(state: StateType, new_page: number) {
    'use strict';
    if (0 <= new_page && new_page <= state.max_page) {
        return assign({}, state, {page: new_page});
    } else {
        return state;
    }
}

function selectItem(state: StateType, item_offset: number) {
    'use strict';
    log.info('TODO: Select Item: No. ' + (state.page * state.items_per_page + item_offset));
    return state;
}

export default function root(state: StateType = init, action: ActionType) {
    'use strict';
    log.info('action type: ', action.type);
    log.debug('action: ', action);
    switch (action.type) {
    case Kind.AdjustWindowToContent:
        return adjustWindowToContent(state);
    case Kind.EmitQuery:
        return emitQuery(state, action.input);
    case Kind.ReceiveQueryResult:
        return receiveQueryResult(state, action.booster_name, action.input, action.candidates);
    case Kind.JumpPage:
        return jumpPage(state, action.page);
    case Kind.SelectItem:
        return selectItem(state, action.item_offset);
    default:
        break;
    }
    return state;
}
