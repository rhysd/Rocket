import * as CP from 'child_process';
import * as path from 'path';
import {EventEmitter} from 'events';
const child_process: typeof CP = global.require('child_process');
const app: GitHubElectron.App = global.require('remote').require('app');
const engine_path = path.join(app.getAppPath(), 'build', 'child', 'booster_engine.js')

export default class Booster extends EventEmitter {
    booster_process: CP.ChildProcess;

    constructor(public pkg_path: string, public name: string) {
        super();
        this.booster_process = child_process.fork(engine_path, [pkg_path, name]);
        this.booster_process.on('close', (code: number) => console.log(`Booster '${name}' closed: ${code}`));
        this.booster_process.on('message', (msg: BoosterProcessMessage) => {
            if (msg.kind === 'query-result') {
                this.emit('query-result', msg.result);
            } else {
                console.log(`Ignored message from booster '${name}': `, msg);
            }
        })
    }

    sendQuery(input: string) {
        const msg: BoosterProcessMessage = {
            kind: 'query',
            input,
        };
        this.booster_process.send(msg);
    }

    shutdown() {
        this.booster_process.send({kind: 'shutdown'});
    }

    // TODO: Send query and returns its promise
    // TODO: Child lifecycle functions
}
