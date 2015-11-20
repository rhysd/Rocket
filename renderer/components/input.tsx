import * as React from 'react';
import TextField = require('material-ui/lib/text-field');
import {emitQuery, jumpPage} from '../actions';
import log from '../log';

interface Props {
    dispatch: Redux.Dispatch;
    page: number;
}

export default class Input extends React.Component<Props, {}> {
    componentDidMount() {
        (this.refs['body'] as TextField).focus();
    }

    onKeyDown(event: React.KeyboardEvent) {
        // TODO
        log.debug('<Input>: onKeyDown', event);
        log.debug('<Input>: onKeyDown', event.nativeEvent);
        const e = event.nativeEvent as KeyboardEvent;

        // Kill tab key to prevent focus from moving
        if (e && e.keyCode === 0x09) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (e && e.ctrlKey) {
            const c = String.fromCharCode(e.keyCode);
            let key_ignored = false;
            switch(c) {
                case 'N':
                    this.props.dispatch(jumpPage(this.props.page + 1));
                    break;
                case 'P':
                    this.props.dispatch(jumpPage(this.props.page - 1));
                    break;
                default:
                    log.debug('Ignored key: ctrl+' + c);
                    key_ignored = true;
                    break;
            }
            if (!key_ignored) {
                e.preventDefault();
            }
        }
    }

    onChange(event: React.SyntheticEvent) {
        const elem = event.nativeEvent.target as HTMLInputElement;
        log.debug('<Input>: onChange', event.nativeEvent, elem.value);
        log.info('<Input>: send query: ' + elem.value);
        this.props.dispatch(emitQuery(elem.value));
    }

    render() {
        return (
            <div className="search-input">
                <TextField
                    hintText="Input..."
                    fullWidth
                    onKeyDown={this.onKeyDown.bind(this)}
                    onChange={this.onChange.bind(this)}
                    ref="body"
                />
            </div>
        );
    }
}
