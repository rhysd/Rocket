import * as React from 'react';
import List = require('material-ui/lib/lists/list');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');
import Avatar = require('material-ui/lib/avatar');
import {adjustWindowToContent} from '../actions';

interface Props {
    dispatch?: Redux.Dispatch;
}

export default class Candidates extends React.Component<Props, {}> {
    componentDidUpdate(prevProps: Props, prevState: {}) {
        // TODO:
        // Only when number of list items is changed, adjust window size to content.
        this.props.dispatch(adjustWindowToContent());
    }

    render() {
        return (
            <List>
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="main.ts"
                    secondaryText={
                    <p className="secondary">
                        ~/Dev/github.com/rhysd/Rocket/browser/main.ts
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="singleton-window.ts"
                    secondaryText={
                    <p className="secondary">
                        ~/Dev/github.com/rhysd/Rocket/browser/singleton-window.ts
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="tray.ts"
                    secondaryText={
                    <p className="secondary">
                        ~/Dev/github.com/rhysd/Rocket/browser/tray.ts
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="tsconfig.json"
                    secondaryText={
                    <p className="secondary">
                        ~/Dev/github.com/rhysd/Rocket/browser/tsconfig.json
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="lib.d.ts"
                    secondaryText={
                    <p className="secondary">
                        ~/Dev/github.com/rhysd/Rocket/browser/lib.d.ts
                    </p>
                    }
                    secondaryTextLines={2} />
            </List>
        );
    }
}
