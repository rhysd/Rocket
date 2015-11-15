import * as React from 'react';
import Input from './input';
import Candidates from './candidates';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="root">
                <Input/>
                <Candidates/>
            </div>
        );
    }
}
