
export enum Kind {
    AdjustWindowToContent
};

export interface ActionType {
    type: Kind;
}

export function adjustWindowToContentSync() {
    return {
        type: Kind.AdjustWindowToContent
    };
}

export function adjustWindowToContent() {
    return (dispatch: Redux.Dispatch) => dispatch(adjustWindowToContentSync());
}
