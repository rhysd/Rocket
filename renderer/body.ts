import BoosterLoader from './booster/booster_loader';
import Booster from './booster/booster';
import {receiveQueryResult} from './actions';

export default class Body {
    loader: BoosterLoader;
    boosters: Booster[];

    constructor(extra_load_paths: string[] = []) {
        this.loader = new BoosterLoader(extra_load_paths);
        this.loader.loadAll().then((boosters: Booster[]) => {
            for (const b of boosters) {
                b.on('query-result', this.updateCandidates.bind(this, b))
            }
            this.boosters = boosters;
            console.log(boosters);
        });
    }

    updateCandidates(booster: Booster, result: BoosterProcessQueryResult) {
        console.log(`Result received from '${booster.name}':`, result);
        receiveQueryResult(booster.name, result.input, result.candidates);
    }

    query(input: string) {
        for (const b of this.boosters) {
            b.sendQuery(input);
        }
    }
}
