export enum Kind {
    AdjustWindowToContent,
    EmitQuery,
    ReceiveQueryResult,
    JumpPage,
    SelectItem,
};

export interface ActionType {
    type: Kind;
    input?: string;
    booster_name?: string;
    candidates?: Candidate[];
    page?: number;
    item_offset?: number;
}

export function adjustWindowToContent() {
    'use strict';
    return (dispatch: Redux.Dispatch) => {
        setImmediate(() => dispatch({
            type: Kind.AdjustWindowToContent
        }));
    };
}

export function emitQuery(input: string) {
    'use strict';
    return (dispatch: Redux.Dispatch) => {
        setImmediate(() => dispatch({
            type: Kind.EmitQuery,
            input,
        }));
    };
}

export function receiveQueryResult(booster_name: string, input: string, candidates: Candidate[]) {
    'use strict';
    return {
        type: Kind.ReceiveQueryResult,
        booster_name,
        input,
        candidates,
    };
}

export function jumpPage(page: number) {
    'use strict';
    return {
        type: Kind.JumpPage,
        page,
    };
}

export function selectItem(item_offset: number) {
    'use strict';
    return {
        type: Kind.SelectItem,
        item_offset,
    };
}
