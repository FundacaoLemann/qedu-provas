# QEdu Provas Angular

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

## Prerequisites

In order to make things work you should have installed int your machine:
* Vangrant ^1.8.5
* VirtualBox ^5.0.26

## Instalation

### 1. Vagrant setup
Setup the environment by running `vagrant up`.
Once it has finished updating and insalling the packages you can access the VM by running `vagrant ssh`.
All the commands are executed from inside the VM and from the *root app folder* wich is mapped to `/qedu-provas-ng/`.

### 2. Environment Setup
From the root app folder run `yarn` to install all the js depencies.


## Development server
From the root app folder run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
