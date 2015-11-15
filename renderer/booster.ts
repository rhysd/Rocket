import * as CP from 'child_process';
const child_process: typeof CP = global.require('child_process');

export default class Booster {
    constructor(public pkg_path: string) {
      // TODO: Fork process with separated booster script
    }

    // TODO: Send query and returns its promise
    // TODO: Child lifecycle functions
}
