import * as path from 'path';
import {app} from 'electron';
import SingletonWindow from './singleton-window';
import setupTray from './tray';

const index_html = 'file://' + path.join(__dirname, '..', '..', 'index.html');
global.debug = (process.env.NODE_DEBUG || '').indexOf('rocket') !== -1;

app.on('ready', () => {
    const w = new SingletonWindow({
        width: 600,
        height: 1000,
        frame: false,
        transparent: true,
    });

    w.once('closed', () => app.quit());
    w.once('dom-ready', () => w.getWebContents().openDevTools({detach: true}));

    w.loadURL(index_html);
    w.registerHotKey('Ctrl+Space');

    setupTray(w);
});

