import * as React from 'react';
import List = require('material-ui/lib/lists/list');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');
import Avatar = require('material-ui/lib/avatar');
import {adjustWindowToContent} from '../actions';
import log from '../log';

interface Props {
    dispatch: Redux.Dispatch;
    candidates: Candidate[];
    maxItems: number;
    focusedIndex: number;
}

export default class Candidates extends React.Component<Props, {}> {
    componentDidUpdate(prevProps: Props, prevState: {}) {
        // TODO:
        // Only when number of list items is changed, adjust window size to content.
        this.props.dispatch(adjustWindowToContent());
    }

    componentDidMount() {
        this.props.dispatch(adjustWindowToContent());
    }

    renderListItem(candidate: Candidate, idx: number) {
        const avatar_src = candidate.iconPath || 'resource/image/rocket.png';
        const props = {
            key: 'item-id-' + idx,
            leftAvatar: <Avatar src={avatar_src}/>,
            primaryText: candidate.primaryText,
            secondaryText: <p className="secondary">{candidate.secondaryText}</p>,
            innerDivStyle: this.props.focusedIndex === idx ? {backgroundColor: '#dddddd'} : undefined,
            ref: 'focused_item',
        };
        return <ListItem {...props}/>;
    }

    render() {
        const {candidates, maxItems} = this.props;
        log.debug('Rendered list items: ', candidates);

        const items: JSX.Element[] = [];
        const num_items = Math.min(candidates.length, maxItems);
        for (let i = 0; i < num_items; ++i) {
            items.push(this.renderListItem(candidates[i], i));
        }

        log.info(`<Candidates> Render ${num_items} items`);

        return <List>{items}</List>;
    }
}
