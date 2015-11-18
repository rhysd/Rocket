import * as React from 'react';
import TextField = require('material-ui/lib/text-field');
import {emitQuery} from '../actions';
import log from '../log';

interface Props {
    dispatch: Redux.Dispatch;
}

export default class Input extends React.Component<Props, {}> {
    componentDidMount() {
        (this.refs['body'] as TextField).focus();
    }

    onKeyDown(event: React.KeyboardEvent) {
        // TODO
        log.debug('<Input>: onKeyDown', event);
        log.debug('<Input>: onKeyDown', event.nativeEvent);
    }

    onChange(event: React.SyntheticEvent) {
        const elem = event.nativeEvent.target as HTMLInputElement;
        log.debug('<Input>: onChange', event.nativeEvent, elem.value);
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
