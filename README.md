<p align="center"><strong>This repository is heavily under construction.</strong></p>

Rocket
======

This is a launcher&searcher like Alfred app.

This is a graphical interface to show the list of something, search items incrementally, and launch various actions.

This aims:

- Optimize your workflow like Alfred-app.
- Easy to add sources using `npm` package like many modern tools in JavaScript.
- Cross Platform:  The same experience in OS X, Windows, and Linux.
- Powerful command line integration

![current progress](https://raw.githubusercontent.com/rhysd/ss/master/Rocket/progress.png)

## Architecture Plan

- Show hidden title bar, toggle with hot key, control app by menubar item.
- App consists of 'Body' (main renderer process) and 'Boosters' (plugins).
- All boosters are run in separated WebWorkers, crawls and reports the result to 'Body'.
- 'Booster' should export a class which is constructed with context as commonjs package.  Body requires it using Electron's node integration.
- 'Body' accepts user input and gathers candidates from 'Boosters'.
- 'Body' provides various actions for the selected item; open with browser, open with app, to clipboard, to text input, to standard output, and so on.  'Booster' provides the list of actions when reporting the curated result to 'Body'
- This app can be used as resident application(toggle with hot key) or CLI app (like percol/peco).

## Boosters

- [rocket-booster-files](https://github.com/rhysd/rocket-booster-files) : Select and open a file

## TODO memo

- Add animation on changing pages
- Notify the selected item to booster to start action
