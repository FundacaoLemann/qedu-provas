# QEdu Provas Angular

This app is written in *Angular 2* with *Angular-cli* and *Docker*.

# MAC and Windows

At first, it will be necessary to get and install [docker-toolbox], this toolbox has important tools to up, deploy and handle the project.

 - Docker Engine
 - Docker Compose
 - Docker Machine
 - Kitematic (Included in Docker Toolbox)


The next step is installing [Virtual Box] (when this documentation was written the current version was 5.0)

# Linux

All the necessary components can be installed individually ([Docker Engine], [Docker Compose], [Docker Machine], [Virtual Box]).

## Creating an environment using Docker Machine

There are three steps to create a new environment

Docker Machine will be responsable to create a virtual environment and after to make deployments, it accepts several drivers, among them, the virtualbox, what's why, we need to run the command below to create the virtual environment or developer environment:
#### Step 1
```sh
$ docker-machine create --driver virtualbox qedu-provas-front
```

#### Step 1.1 (Only Linux)
Due to a file sharing bug in `boot2docker`. You should run the following command to correct it.

```sh
$ curl -L http://bit.do/dm-lin-home | docker-machine ssh ${MACHINE:-qedu-provas-front} sudo tee /var/lib/boot2docker/bootlocal.sh
$ docker-machine ssh ${MACHINE:-qedu-provas-front} sudo chmod +x /var/lib/boot2docker/bootlocal.sh
$ docker-machine ssh ${MACHINE:-qedu-provas-front} sudo /var/lib/boot2docker/bootlocal.sh
```
After run this commands, restart your machine to apply the modifications.

#### Step 2
After this, we need to tell Docker to talke to the new machine:
```sh
$ docker-machine env qedu-provas-front
```

#### Step 3
Enter into the machine:
```sh
$ eval "$(docker-machine env qedu-provas-front)"
```

## Access development Live Reload
Need to expose the public so browsers can connect to live reload port:
```sh
docker-machine ssh qedu-provas-front -f -N -L 4200:localhost:4200
```

## Configure the Containers with Docker Compose:
Docker compose will configure all the containers at the same time and links them in the same infrastructure.

So, after enter into the machine using docker-machine command and run follow:
```sh
$ docker-compose -f provision/docker-compose.yml up -d
```

## Get machine IP
To get the machine IP, run the follow command:
```sh
$ docker-machine ip qedu-provas-front
```

## Define a dns for the machine
Define `provas.qedu.dev` as hostname, so, put the public ip into local hosts to define a hostname, example:
```
192.168.99.100 provas.qedu.dev
```

## Access development page

<http://provas.qedu.dev>

## Enter into container
```sh
$ docker exec -it qedu-provas-front bash
```

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

`*IMPORTANT*`

Some tests fails unexpectedly when running inside docker environment and break the execution.
Due this strange behavior, run the tests locally:

Run `yarn test` to execute the unit tests via [Karma].

### Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor].
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README].



[docker-toolbox]: <https://www.docker.com/products/docker-toolbox>
[Docker Compose]: <https://docs.docker.com/compose/install/>
[Docker Engine]: <https://docs.docker.com/engine/installation/>
[Docker Machine]: <https://docs.docker.com/machine/install-machine/>
[Kitematic]: <https://docs.docker.com/kitematic/>
[Virtual Box]: <https://www.virtualbox.org/wiki/Downloads>
[Vagrant]: <https://www.vagrantup.com/>
[Protractor]: <http://www.protractortest.org/>
[Karma]: <https://karma-runner.github.io>
[Angular-CLI README]: <https://github.com/angular/angular-cli/blob/master/README.md>
