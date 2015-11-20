import * as React from 'react';
import {connect} from 'react-redux';
import {StateType} from '../reducers';
import Input from './input';
import Candidates from './candidates';

interface Props {
    dispatch?: Redux.Dispatch;
    candidates?: Candidate[];
    page?: number;
    itemsPerPage?: number;
}

class App extends React.Component<Props, {}> {
    render() {
        const {dispatch, candidates, page, itemsPerPage} = this.props;
        return (
            <div className="root">
                <Input dispatch={dispatch} page={page}/>
                <Candidates dispatch={dispatch} candidates={candidates} page={page} itemsPerPage={itemsPerPage}/>
            </div>
        );
    }
}

function select(state: StateType): Props {
    const candidates: Candidate[] = [];

    // Note:
    // .values() is not available for 'for' statement
    // because it uses ES6 Iterator interface
    for (const cs of state.candidates.toArray()) {
        candidates.push.apply(candidates, cs);
    }

    return {
        candidates,
        page: state.page,
        itemsPerPage: state.items_per_page,
    };
}

export default connect(select)(App);
