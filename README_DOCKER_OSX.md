# QEdu Provas Front

This app is written with *Docker*, *nginx*, *php 7* with *symfony* and *mongo* as database.

# MAC

Install Docker For MacOS following the Guide instruction from Docker website.

[docker for macos]: <https://docs.docker.com/docker-for-mac/install/>

# Creating the environment

To execute the following steps you need to go to Terminal and access the Provas project's path.

## Step 1 (Build QEdu Provas Front Image)
```
$ docker build -t qedu_provas_front .
```

## Step 2 (Run QEdu Provas Front Containers)

```
$ docker composer up -d
```

## Step 3 (Define DNS)

```
127.0.0.1 provas.qedu.dev
```

## Step 4 (Access API and Front)

### API

Check the improvements into the api repository to both services work together

### Front

<http://provas.qedu.dev>
