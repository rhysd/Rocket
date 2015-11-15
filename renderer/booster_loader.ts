import * as path from 'path';
import * as FS from 'fs';
const fs: typeof FS  = global.require('fs');
import Booster from './booster';

const app: GitHubElectron.App = global.require('remote').require('app');

const DEFAULT_LOADEER_PATHS = [
    app.getAppPath(),
    app.getPath('userData'),
];

export default class BoosterLoader {
    load_paths: string[];
    loaded: boolean;

    constructor(extra_load_paths: string[]) {
        this.load_paths = DEFAULT_LOADEER_PATHS.concat(extra_load_paths);
        this.loaded = false;
    }

    loadFrom(pkg_path: string) {
        return new Booster(pkg_path);
    }

    loadAllFrom(load_path: string): Booster[] {
        const module_path = path.join(load_path, 'node_modules');
        try {
            return fs
                .readdirSync(module_path)
                .filter(entry => entry.startsWith('rocket-booster-'))
                .map(pkg_entry => this.loadFrom(path.join(module_path, pkg_entry)));
        } catch(err) {
            return [];
        }
    }

    loadAll() {
        return new Promise(resolve => resolve(
                    this.load_paths.reduce(
                        (acc, elem) => {
                            acc.push.apply(acc, this.loadAllFrom(elem));
                            return acc;
                        },
                        [] as Booster[]
                    )
                )
            );
    }
}
