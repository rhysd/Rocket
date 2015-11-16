/// <reference path="../typings/tsd.d.ts" />

declare module NodeJS {
    interface Global {
        require(m: string): any;
        module: NodeModule;
    }

}

interface NodeModule {
    paths: string[];
}

interface String {
    startsWith(searchStr: string, pos?: number): boolean;
}

interface BoosterProcessMessage {
    kind: string;
    input?: string;
}

interface QueryResultCandidate {
    primaryText: string;
    secondaryText?: string;
    iconPath?: string;
}

interface BoosterProcessQueryResult {
    input: string;
    candidates: QueryResultCandidate[];
}
