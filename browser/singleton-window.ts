import {BrowserWindow, globalShortcut} from 'electron';
import {EventEmitter} from 'events';

export default class SingletonWindow extends EventEmitter {
    private native_window: GitHubElectron.BrowserWindow;
    private hotkey: string;

    constructor(options: GitHubElectron.BrowserWindowOptions) {
        super();

        this.native_window
            = new BrowserWindow(options);
        this.native_window.setVisibleOnAllWorkspaces(true);
        this.native_window.once('closed', () => {
            if (this.hotkey) {
                globalShortcut.unregister(this.hotkey);
            }
            this.native_window = null;
            this.emit('closed');
        });

        if (!global.debug) {
            this.native_window.on('blur', () => this.hide());
        }

        this.hotkey = null;
    }

    loadURL(url: string) {
        this.native_window.webContents.once('dom-ready', () => this.emit('dom-ready'));
        this.native_window.loadURL(url);
        this.native_window.center();
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
            globalShortcut.unregister(this.hotkey);
        }
        globalShortcut.register(accelerator, () => this.toggle());
        this.hotkey = accelerator;
    }
}
