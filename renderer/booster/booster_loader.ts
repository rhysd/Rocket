import * as path from 'path';
import * as FS from 'fs';
const fs: typeof FS  = global.require('fs');
import Booster from './booster';

const app: GitHubElectron.App = global.require('remote').require('app');

const DEFAULT_LOADEER_PATHS
    = global.module.paths
            .concat([path.join(app.getPath('userData'), 'node_modules')])
            .filter(p => path.isAbsolute(p));

export default class BoosterLoader {
    load_paths: string[];

    constructor(extra_load_paths: string[]) {
        this.load_paths = DEFAULT_LOADEER_PATHS.concat(extra_load_paths);
    }

    loadFrom(pkg_path: string) {
        const booster_name = path.basename(pkg_path).slice('rocket-booster-'.length);
        return new Booster(pkg_path, booster_name);
    }

    loadAllFrom(load_path: string): Booster[] {
        try {
            return fs
                .readdirSync(load_path)
                .filter(entry => entry.startsWith('rocket-booster-'))
                .map(pkg_entry => this.loadFrom(path.join(load_path, pkg_entry)));
        } catch (err) {
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
