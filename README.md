# QEdu Provas Angular

This app is written in Angular 2 with Angular-cli and before you can run the app choose the most suitable option for you to setup the development environment.
You can choose between a [local installation](#local-setup) or run from a [Vagrant machine](#vagrant-setup).

## Requirements

The app is set to run from a `node.js` environment and require some global depencies:

* node.js ^6.9
* yarn ~0.16
* angular-cli ~1.0.0

## Vagrant Setup

The Vagrant setup just install all the depencies on a `Ubuntu` machine so you don't need to worry about missing dependencies or OS conflicts.

### Prerequisites

In order to make things work you should have installed in your machine:
* [Vangrant ^1.8.5](https://www.vagrantup.com/downloads.html)
* [VirtualBox ~5.0.26](https://www.virtualbox.org/wiki/Download_Old_Builds_5_0)

### Installing and running

* Clone this repository
* Update the `Vagrantfile` synced folder path (`config.vm.synced_folder`) with you repository path.
* Navigate through your terminal to the app root folder
* Run `vagrant up` to start the `Ubuntu VM`. In the first time, Vagrant will download and install the box and the dependecies and It may take a while.
* Access the `Ubuntu VM` through ssh with `vagrant ssh`
* From the VM navigate to shared synced folder with `cd /qedu-provas-ng` (default) or to your synced folder
* Install the project depencies with `yarn`
* Start the Webpack Developer Server (WDS) with `yarn start`. That is a shortcut to `ng serve --host 0.0.0.0`
* Open [`http://localhost:4200`](http://localhost:4200) in your browser to see app running

To shutdown the VM use `vagrant halt` from the root app folder.

## Local Setup

To run the app from a local environment be sure you have the [requirements](#requirements) installed in a global scope.

### Installing and Running

* Clone this repository
* Navigate through your terminal to the app root folder
* Install depencies with `yarn`
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
