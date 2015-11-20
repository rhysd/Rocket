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
        const avatar_style = {
            height: '48px',
            width: '48px',
            display: 'block',
            position: 'absolute',
        };
        const avatar = candidate.imagePath ? <img src={candidate.imagePath} style={avatar_style}/> : undefined;
        const props = {
            key,
            leftAvatar: avatar,
            primaryText: candidate.primaryText,
            secondaryText: <p className="secondary-text">{candidate.secondaryText}</p>,
        };
        return <ListItem {...props}/>;
    }

    render() {
        const {candidates, itemsPerPage, page} = this.props;
        log.debug('Rendered list items: ', candidates);

        const start_idx = page * itemsPerPage;
        const items: JSX.Element[] = [];
        const num_items = Math.min(candidates.length - start_idx, itemsPerPage);
        if (num_items === 0) {
            return <List/>;
        }

        for (let i = 0; i < num_items; ++i) {
            items.push(this.renderListItem(candidates[i + start_idx], 'item-id-' + i));
        }

        // TODO: Display 'n/m' (n = current page, m = max page)
        log.info(`<Candidates> Render ${num_items} items`);

        const page_count = `${page + 1}/${Math.floor(candidates.length / itemsPerPage + 1)}`;
        const badge_style = {
            backgroundColor: '#00bcd4',
            borderRadius: '4px',
            padding: '0px 6px',
            width: 'auto',
            marginRight: '20px',
        };

        return (
            <Badge secondary badgeContent={page_count} badgeStyle={badge_style}>
                <List>{items}</List>
            </Badge>
        );
    }
}
