# Extension Scaffold Compose

This is a development environment that will run the demo
and all of its dependent examples.

After installing `docker-compose` on your system and cloning this project
there are a couple of one time steps to setup before you can run the demonstration.

> In the instructions below, `extension-scaffold` is the top-level folder after cloning the project.

## Running `npm install` in all containers (now `rush update`)

We replaced `npm install` with `rush update`.
See [Building with Rush](../documentation/Building-with-Rush.md)

## One-time of Dependencies

After you have setup NPM private registry:
Run `rush update`.

## Accessing the Development Containers

```bash
$ docker-compose up -d
```

note: run with 'docker-compose up --build' if recently updated docker build context

Finally, browse to `http://localhost/es/ui/`. 
Currently, the compose environment uses many ports: `80`, `8080`, `9091`, `9092`, `9093`, and `9094`. 
It also reserves `8081`, `8082`, and `3000` for the `nodejs` development container, which is not used.
