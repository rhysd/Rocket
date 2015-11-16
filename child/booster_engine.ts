// Note:
// This script is run in a process forked from renderer process

/// <reference path="../renderer/lib.d.ts" />

if (process.argv.length !== 2) {
    process.exit(0);
}

import {EventEmitter} from 'events';

class Context extends EventEmitter {
    constructor(public pkg_path: string, public booster_name: string) {
        super();
    }
}

const context = new Context(process.argv[0], process.argv[1]);
const BoosterClass = global.require(context.pkg_path);
const booster = new BoosterClass(context);

// TODO:
// Register context event emitted from booster (query result)

context.on('query-result', (result: BoosterProcessQueryResult) => {
    // TODO: Validate the result object
    process.send(result);
})

process.on('message', (msg: BoosterProcessMessage) => {
    const k = msg.kind;
    if (k === 'shutdown') {
        context.emit('shutdown');
        process.exit(0);
    } else if (k === 'query') {
        context.emit('query', msg.input);
    }
});
