# QEdu Provas Angular

This app is written in *Angular 2* with *Angular-cli*.

## Requirements

The app is set to run from a `node.js` environment and require some global depencies:

* node.js ^6.9
* yarn ~0.16
* angular-cli ~1.0.0

## Setup

To run the app from a local environment be sure you have the [requirements](#requirements) installed in a global scope.

### Installing and Running

* Clone this repository
* Navigate through your terminal to the app root folder
* Install depencies with `yarn`
* Start the `Fake API` server with `yarn fake-api` to support `mocked json` requests on tests and preview 
* Start the Webpack Developer Server (WDS) with `yarn start` or `ng serve`
* Open [`http://localhost:4200`](http://localhost:4200) in your browser to see app running


## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
