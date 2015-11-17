import * as React from 'react';
import List = require('material-ui/lib/lists/list');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');
import Avatar = require('material-ui/lib/avatar');
import {adjustWindowToContent} from '../actions';

interface Props {
    dispatch: Redux.Dispatch;
    candidates: Candidate[];
}

export default class Candidates extends React.Component<Props, {}> {
    componentDidUpdate(prevProps: Props, prevState: {}) {
        // TODO:
        // Only when number of list items is changed, adjust window size to content.
        // this.props.dispatch(adjustWindowToContent());
        console.log('<Candidates> updated!');
    }
    componentDidMount() {
        this.props.dispatch(adjustWindowToContent());
    }

    renderListItem(candidate: Candidate, key: string) {
        const avatar_src = candidate.iconPath || 'resource/image/rocket.png';
        const props = {
            key,
            leftAvatar: <Avatar src={avatar_src}/>,
            primaryText: candidate.primaryText,
            secondaryText: <p className="secondary">{candidate.secondaryText}</p>,
        };
        return <ListItem {...props}/>;
    }

    render() {
        const items = this.props.candidates.map(
                (c: Candidate, i: number) => this.renderListItem(c, 'item-id-' + i)
            );
        return <List>{items}</List>;
    }
}
