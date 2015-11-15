import * as app from 'app';
import BoosterLoader from './booster_loader';

export default class Body {
    loader: BoosterLoader;
    boosters: any[];

    constructor(extra_load_paths: string[] = []) {
        this.loader = new BoosterLoader(extra_load_paths);
        this.loader.loadAll().then((boosters: any) => {
            this.boosters = boosters;
            console.log(boosters);
        });
    }

    query(input: string) {
        // TODO
    }
}
