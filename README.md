## Description

Multi-Stage Dockerized NestJs

- Can be used as dev environment with watch mode,
- Postgresql
- Redis
- and runs in runInCluster :)

## Running the app

```bash
# development
$ docker-compose up --build

# production mode
First erase "target: development" from docker-compose file
$ docker-compose up --build
```
