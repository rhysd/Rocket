import * as React from 'react';
import {connect} from 'react-redux';
import {StateType} from '../reducers';
import Input from './input';
import Candidates from './candidates';

interface Props {
    dispatch?: Redux.Dispatch;
    candidates?: Candidate[];
    focusedIndex?: number;
}

class App extends React.Component<Props, {}> {
    render() {
        const {dispatch, candidates, focusedIndex} = this.props;
        return (
            <div className="root">
                <Input dispatch={dispatch}/>
                <Candidates dispatch={dispatch} candidates={candidates} maxItems={20} focusedIndex={focusedIndex}/>
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
        focusedIndex: state.focused_index,
    };
}

export default connect(select)(App);
