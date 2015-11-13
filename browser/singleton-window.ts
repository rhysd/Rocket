import * as BrowserWindow from 'browser-window';
import * as GlobalShortcut from 'global-shortcut';
import {EventEmitter} from 'events';

export default class SingletonWindow extends EventEmitter {
    private native_window: GitHubElectron.BrowserWindow;
    private hotkey: string;

    constructor(options: GitHubElectron.BrowserWindowOptions) {
        super();

        this.native_window
            = new BrowserWindow({
                width: 600,
                height: 1000,
                frame: false,
            });
        this.native_window.setVisibleOnAllWorkspaces(true);
        this.native_window.once('closed', () => {
            if (this.hotkey) {
                GlobalShortcut.unregister(this.hotkey);
            }
            this.native_window = null;
            this.emit('closed');
        });
        this.native_window.on('blur', () => this.hide());

        this.hotkey = null;
    }

    loadUrl(url: string) {
        this.native_window.webContents.once('dom-ready', () => this.emit('dom-ready'));
        this.native_window.loadUrl(url);
    }

    getWebContents() {
        return this.native_window.webContents;
    }

    close() {
        this.native_window.close();
    }

    hide() {
        this.native_window.hide();
        this.emit('hidden');
    }

    show() {
        this.native_window.show();
        this.emit('shown');
        if (!this.native_window.isFocused()) {
            this.native_window.focus();
            this.emit('focused');
        }
    }

    toggle() {
        if (this.native_window.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    }

    registerHotKey(accelerator: string) {
        if (this.hotkey) {
            GlobalShortcut.unregister(this.hotkey);
        }
        GlobalShortcut.register(accelerator, () => this.toggle());
        this.hotkey = accelerator;
    }
}
