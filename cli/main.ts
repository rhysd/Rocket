import {spawn} from 'child_process';
import {join} from 'path';
import * as electron from 'electron-prebuilt';

let argv = process.argv;

const detach_idx = argv.indexOf('--detach');
const detached = detach_idx !== -1;
if (detached) {
    argv.splice(detach_idx, 1);
}

argv.unshift(join(__dirname, '..', '..'));

if (detached) {
    spawn(electron, argv, {
        stdio: 'ignore',
        detached: true,
    }).unref();
} else {
    spawn(electron, argv, { stdio: 'inherit' });
}
