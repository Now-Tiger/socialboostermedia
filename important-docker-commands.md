# Important Docker Commands

## rebuild the container

```bash
docker compose down -v

docker compose build --no-cache

docker compose up -d
```

## only rebuild required service

```bash
docker compose up -d --no-deps --build <service_name>
```

- `--no-deps`: Prevents Docker from also building or starting any services that.

## Check logs

```bash
docker logs -f <service_name> --tail 50
```

## Enter shell

```bash
docker compose exec <se
docker compose exec db psql -U postgresuser -d sbmdb
```
