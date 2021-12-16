# Docker tutorial to setup ruby development workflow

This post covers setting up docker to run a ruby file. Nothing fancy but will showcase how
to setup docker to ease.

1. Go over using minimal alpine image
   - Install `ruby`
2. Use `Dockerfile` to build an image with `Ruby` preinstalled
3. Mount ruby project into container for development purpose.

## Prerequisite

This tutorial assumes that you are aware of what Docker and you are well versed with Ruby.
Note that you would need a system with Docker to try this out.

We create a `Dockerfile` with following content.

```Dockerfile:title=Dockerfile
FROM alpine:latest
```

To connect to the Docker container, we need to build the container.
Run the following command in the folder that has `Dockerfile`

```bash
docker build -t ch4nd4n/ruby .
```

Note that `ch4nd4n/ruby` is just a name that I have assigned to this docker container image.

To verify that container image was built, run the following.

```bash
docker images
```

It should be something similar to following

```
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
ch4nd4n/ruby   latest    3520b8c5fa53   1 hours ago   5.33MB
```

To do something more useful than just building it, let's connect in to interactive terminal with following command.

```sh
docker run -it --rm ch4nd4n/ruby
```

This should brings up container terminal, here if you run something like `whoami` you it most likely would print `root`.

```sh
whoami
```

Another thing to tryout would be to open another terminal and see docker processes

```sh
docker ps
```

You would see something similar to below

```
CONTAINER ID   IMAGE          COMMAND     CREATED         STATUS         PORTS     NAMES
a6006f14a0bc   ch4nd4n/ruby   "/bin/sh"   2 minutes ago   Up 2 minutes             busy_moore
```

`docker ps` shows running docker processes.

Going back to the other terminal where we have docker shell open if we type `ruby` it would say `not found` we can fix this by running `apk add ruby`

```bash
apk add ruby
```

## Update Dockerfile

In this section we bake in ruby into the container, to do that we update Dockerfile to something like below

```Dockerfile
FROM alpine:latest
RUN apk add ruby
```

Next we build the new container

```sh
docker build -t ch4nd4n/ruby .
```

> If you check the container image size you would see the size has apparently changed.

```sh
docker images
```

On my box it shows something like below, but for you mileage may differ

```
REPOSITORY     TAG       IMAGE ID       CREATED         SIZE
ch4nd4n/ruby   latest    3520b8c5fa53   7 seconds ago   21.8MB
<none>         <none>    1ad3d6652d73   2 weeks ago     5.33MB
```
