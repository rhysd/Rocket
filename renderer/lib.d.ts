/// <reference path="../typings/tsd.d.ts" />

declare namespace NodeJS {
    interface Global {
        module: NodeModule;
        require(m: string): any;
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
