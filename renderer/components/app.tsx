import * as React from 'react';
import {connect} from 'react-redux';
import {StateType} from '../reducers';
import Input from './input';
import Candidates from './candidates';
import {ActionType, } from '../actions';

interface Props {
    dispatch?: (action: ActionType | Function) => void;
}

class App extends React.Component<Props, {}> {
    render() {
        return (
            <div className="root">
                <Input/>
                <Candidates dispatch={this.props.dispatch}/>
            </div>
        );
    }
}

function select(state: StateType) {
    return {};
}

export default connect(select)(App);
