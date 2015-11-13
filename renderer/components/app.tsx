import * as React from 'react';
import Input from './input';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="root">
                <Input/>
                <div className="tmp" />
            </div>
        );
    }
}
