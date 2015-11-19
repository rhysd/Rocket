import * as React from 'react';
import List = require('material-ui/lib/lists/list');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');
import Avatar = require('material-ui/lib/avatar');
import Badge = require('material-ui/lib/badge');
import {adjustWindowToContent} from '../actions';
import log from '../log';

interface Props {
    dispatch: Redux.Dispatch;
    candidates: Candidate[];
    itemsPerPage: number;
    page: number;
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
        const {candidates, itemsPerPage, page} = this.props;
        log.debug('Rendered list items: ', candidates);

        const start_idx = page * itemsPerPage;
        const items: JSX.Element[] = [];
        const num_items = Math.min((candidates.length - 1) - start_idx, itemsPerPage);
        for (let i = 0; i < num_items; ++i) {
            items.push(this.renderListItem(candidates[i + start_idx], 'item-id-' + i));
        }

        // TODO: Display 'n/m' (n = current page, m = max page)
        log.info(`<Candidates> Render ${num_items} items`);

        const page_count = `${page + 1}/${candidates.length / itemsPerPage + 1}`;

        return (
            <Badge  badgeContent={page_count}>
                <List>{items}</List>
            </Badge>
        );
    }
}
