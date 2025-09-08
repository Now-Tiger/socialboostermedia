# Social Booster Media App

This is a simple crud application built with **NextJS**, **Python(django)** & **PostgreSQL**. This app is my submission to social booster media's take-home assessment.

# App set up

First clone this repository in your system.

```bash
git clone git@github.com:Now-Tiger/socialboostermedia.git
```

Change directory.

```bash
cd socialboostermedia
```

You'll see two folders `frontend` & `backend`. The frontend is simple NextJS project, although the backend is **dockerized** application. First let's setup the backend.

## Backend

Follow below steps one by one

#### Build docker images

```bash
docker compose build
```

#### Pull Postgres image

For some reasons `docker-compose.yml` is not able to full postgres image. You'll have to enter below command. **This is an important step**

```bash
docker pull postgres:15.5-alpine
```

#### Start containers

Below command runs the containers in the background.

```bash
docker compose up -d
```

To check if the containers are running, you can use:

```bash
docker compose ps
```

#### Django app logs

```bash
docker logs -f backend-web-1 --tail 50
```

#### Postgres checkup

```bash
docker compose exec db psql -U postgresuser -d sbmdb
```

## Frontend

Change directory into frontend and follow below steps one by one. This starts the frontend locally.

```Bash
npm install
npm run dev
```
