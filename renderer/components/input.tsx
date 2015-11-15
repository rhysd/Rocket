import * as React from 'react';
import TextField = require('material-ui/lib/text-field');

export default class Input extends React.Component<{}, {}> {
    componentDidMount() {
        (this.refs['body'] as TextField).focus();
    }

    render() {
        return (
            <TextField
                hintText="Input..."
                fullWidth
                ref="body"
            />
        );
    }
}
