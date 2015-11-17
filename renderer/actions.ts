
export enum Kind {
    AdjustWindowToContent,
    EmitQuery,
    ReceiveQueryResult,
};

export interface ActionType {
    type: Kind;
    input?: string;
    booster_name?: string;
    candidates?: Candidate[];
}

export function adjustWindowToContent() {
    return (dispatch: Redux.Dispatch) => {
        setImmediate(() => dispatch({
            type: Kind.AdjustWindowToContent
        }));
    };
}

export function emitQuery(input: string) {
    return (dispatch: Redux.Dispatch) => {
        setImmediate(() => dispatch({
            type: Kind.EmitQuery,
            input,
        }));
    };
}

export function receiveQueryResult(booster_name: string, input: string, candidates: Candidate[]) {
    return {
        type: Kind.ReceiveQueryResult,
        booster_name,
        input,
        candidates,
    };
}
