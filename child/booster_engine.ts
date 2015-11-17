// Note:
// This script is run in a process forked from renderer process

/// <reference path="../renderer/lib.d.ts" />

if (process.argv.length < 2) {
    console.log('Incorrect booster start: ', process.argv);
    process.exit(0);
}

import {EventEmitter} from 'events';

class Context extends EventEmitter {
    constructor(public pkg_path: string, public booster_name: string) {
        super();
    }
}

const argv_len = process.argv.length;
const context = new Context(process.argv[argv_len - 2], process.argv[argv_len - 1]);
const BoosterClass = require(context.pkg_path);

/* tslint:disable:no-unused-variable */
const booster = new BoosterClass(context);
/* tslint:enable:no-unused-variable */

// TODO:
// Register context event emitted from booster (query result)

context.on('query-result', (result: BoosterProcessQueryResult) => {
    // TODO: Validate the result object
    process.send({kind: 'query-result', result});
});

process.on('message', (msg: BoosterProcessMessage) => {
    const k = msg.kind;
    if (k === 'shutdown') {
        context.emit('shutdown');
        process.exit(0);
    } else if (k === 'query') {
        context.emit('query', msg.input);
    } else {
        console.log(`${context.booster_name}: Ignored message from body`);
    }
});
