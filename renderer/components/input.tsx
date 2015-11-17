import * as React from 'react';
import TextField = require('material-ui/lib/text-field');
import {emitQuery} from '../actions';

interface Props {
    dispatch: Redux.Dispatch;
}

export default class Input extends React.Component<Props, {}> {
    componentDidMount() {
        (this.refs['body'] as TextField).focus();
    }

    onKeyDown(event: React.KeyboardEvent) {
        // TODO
        console.log('onKeyDown', event);
        console.log('onKeyDown', event.nativeEvent);
    }

    onChange(event: React.SyntheticEvent) {
        console.log('onChange', event.nativeEvent);
        const elem = event.nativeEvent.target as HTMLInputElement;
        this.props.dispatch(emitQuery(elem.value));
    }

    render() {
        return (
            <TextField
                hintText="Input..."
                fullWidth
                onKeyDown={this.onKeyDown.bind(this)}
                onChange={this.onChange.bind(this)}
                ref="body"
            />
        );
    }
}
