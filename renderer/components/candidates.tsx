import * as React from 'react';
import List = require('material-ui/lib/lists/list');
import ListItem = require('material-ui/lib/lists/list-item');
import ListDivider = require('material-ui/lib/lists/list-divider');
import Avatar = require('material-ui/lib/avatar');

export default class Candidates extends React.Component<{}, {}> {
    render() {
        return (
            <List>
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="Brendan Lim"
                    secondaryText={
                    <p className="secondary">
                        I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="me, Scott, Jennifer"
                    secondaryText={
                    <p className="secondary">
                        Wish I could come, but I&apos;m out of town this weekend.
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="Grace Ng"
                    secondaryText={
                    <p className="secondary">
                        Do you have any Paris recs? Have you ever been?
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="Kerem Suer"
                    secondaryText={
                    <p className="secondary">
                        Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                    </p>
                    }
                    secondaryTextLines={2} />
                <ListDivider inset={true} />
                <ListItem
                    leftAvatar={<Avatar src="resource/image/rocket.png" />}
                    primaryText="Raquel Parrado"
                    secondaryText={
                    <p className="secondary">
                        We should eat this: grated squash. Corn and tomatillo tacos.
                    </p>
                    }
                    secondaryTextLines={2} />
            </List>
        );
    }
}
