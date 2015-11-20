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
    page: number;
    itemsPerPage: number;
    maxPage: number;
}

const Labels = [
    'Ret',
    'C-1',
    'C-2',
    'C-3',
    'C-4',
    'C-5',
    'C-6',
    'C-7',
    'C-8',
    'C-9',
];

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
        const avatar_style = {
            height: '48px',
            width: '48px',
            display: 'block',
            position: 'absolute',
        };
        const avatar = candidate.imagePath ? <img src={candidate.imagePath} style={avatar_style}/> : undefined;
        const props = {
            key: 'item-id-' + idx,
            leftAvatar: avatar,
            rightAvatar: <span className="keymap-label">{Labels[idx]}</span>,
            primaryText: candidate.primaryText,
            secondaryText: <p className="secondary-text">{candidate.secondaryText}</p>,
        };
        return <ListItem {...props}/>;
    }

    render() {
        const {candidates, itemsPerPage, page, maxPage} = this.props;
        log.debug('Rendered list items: ', candidates);

        const start_idx = page * itemsPerPage;
        const items: JSX.Element[] = [];
        const num_items = Math.min(candidates.length - start_idx, itemsPerPage);
        if (num_items === 0) {
            return <List/>;
        }

        for (let i = 0; i < num_items; ++i) {
            items.push(<ListDivider inset={true} key={'div-id-' + i}/>);
            items.push(this.renderListItem(candidates[i + start_idx], i));
        }

        // TODO: Display 'n/m' (n = current page, m = max page)
        log.info(`<Candidates> Render ${num_items} items`);

        const page_count = `${page + 1}/${Math.floor(maxPage + 1)}`;
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
