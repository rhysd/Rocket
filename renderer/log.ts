import log = require('loglevel');
export const debug_flag: boolean = global.require('electron').remote.getGlobal('debug');

// TODO: Set log level to 'warn' on product

if (debug_flag) {
    log.setLevel('debug');
} else {
    log.setLevel('info');
}

export default log;
