import * as path from 'path';
import * as app from 'app';
import * as BrowserWindow from 'browser-window';

const index_html = 'file://' + path.join(__dirname, '..', '..', 'index.html');

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 600,
        height: 1000,
        'title-bar-style': 'hidden',
    });

    win.on('closed', () => {
        win = null;
        app.quit();
    });

    win.webContents.once('dom-ready', () => win.webContents.openDevTools({detach: true}));
    win.loadUrl(index_html);
});
