import {Tray, Menu, app} from 'electron';
import SingletonWindow from './singleton-window';
import {join} from 'path';

function buildTrayMenu(win: SingletonWindow) {
    'use strict';
    const template = [
        {
            label: 'Toggle Window',
            click: function(){ win.toggle(); },
        },
        {
            label: 'About Rocket',
            role: 'about',
        },
        {
            label: 'Quit Rocket',
            click: function() { app.quit(); },
        },
    ];
    return Menu.buildFromTemplate(template);
}

export default function setupTray(win: SingletonWindow) {
    'use strict';
    const t = new Tray(join(__dirname, '..', '..', 'resource', 'image', 'tray-icon.png'));
    t.setToolTip('Rocket');
    t.setContextMenu(buildTrayMenu(win));
    return t;
}
