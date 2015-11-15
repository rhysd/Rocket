/// <reference path="../typings/tsd.d.ts" />

declare module NodeJS {
    interface Global {
        require(m: string): any;
    }
}

interface String {
    startsWith(searchStr: string, pos?: number): boolean;
}
