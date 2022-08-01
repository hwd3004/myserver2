```
docker rm -f postgres-container

docker run -d --name postgres-container -e POSTGRES_PASSWORD=1234 -p 5432:5432 postgres

psql -U postgres

db 목록 조회 명령어 - \l

SELECT * FROM PG_USER;

alter user postgres password '1234';
```
