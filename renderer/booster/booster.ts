import * as CP from 'child_process';
import * as path from 'path';
import {EventEmitter} from 'events';
const child_process: typeof CP = global.require('child_process');
const app: GitHubElectron.App = global.require('remote').require('app');
import log from '../log';

const engine_path = path.join(app.getAppPath(), 'build', 'child', 'booster_engine.js')

export default class Booster extends EventEmitter {
    booster_process: CP.ChildProcess;

    constructor(public pkg_path: string, public name: string) {
        super();
        this.booster_process = child_process.fork(engine_path, [pkg_path, name]);
        this.booster_process.on('close', (code: number) => log.debug(`Booster '${name}' closed: ${code}`));
        this.booster_process.on('message', (msg: BoosterProcessMessage) => {
            if (msg.kind === 'query-result') {
                log.debug(`Booster '${name}' Received query result: ${msg}`);
                this.emit('query-result', msg.result);
            } else {
                log.error(`Ignored unknown message from booster '${name}': `, msg);
            }
        })
    }

    // Note:
    // Perhaps I should use pipe instead of interprocess communication
    // because ipc is synchronous.

    sendQuery(input: string) {
        const msg: BoosterProcessMessage = {
            kind: 'query',
            input,
        };
        log.debug(`Booster '${this.name}' Send query: ${input}`);
        this.booster_process.send(msg);
    }

    shutdown() {
        this.booster_process.send({kind: 'shutdown'});
    }

    // TODO: Send query and returns its promise
    // TODO: Child lifecycle functions
}
