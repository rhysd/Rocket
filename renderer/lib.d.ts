/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/github-electron.d.ts" />
/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />

// DefinitelyTyped/redux-thunk/redux-thunk.d.ts is broken.
declare module 'redux-thunk' {
    import { Middleware } from 'redux';
    interface Thunk extends Middleware { }
    const thunk: Thunk;
    export = thunk;
}

interface NodeModule {
    paths: string[];
}

interface String {
    startsWith(searchStr: string, pos?: number): boolean;
}

interface Candidate {
    primaryText: string;
    secondaryText?: string;
    imagePath?: string;
}

interface BoosterProcessQueryResult {
    input: string;
    candidates: Candidate[];
}

interface BoosterProcessMessage {
    kind: string;
    input?: string;
    result?: BoosterProcessQueryResult;
}

interface NodeRequireFunction {
    (id: string): any;
}

declare namespace NodeJS {
    interface Global {
        module: NodeModule;
        require: NodeRequireFunction;
    }
}

