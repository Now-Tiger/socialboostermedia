# Important Docker Commands

## Build and run the container

```bash
docker compose down -v

docker compose build --no-cache

docker compose up -d
```

## Rebuild required service only

```bash
docker compose up -d --no-deps --build <service_name>
```

## Check logs

```bash
docker logs -f <service_name> --tail 50
```

## Enter shell

```bash
docker compose exec db psql -U postgresuser -d sbmdb
```
