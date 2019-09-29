# Remote Directionary Server
~~~
data presistence
more data typs
support data backup
~~~
## Redis Start Up
~~~
redis-server /redis.conf
redis-cli -p 6379
ping

ps -ef | grep redis
~~~
## Use Database
~~~
//redis has 16 databases in default
select 7

//check the size of data in one database
DBSIZE
keys *

set k2 v2

//remove all the data in one database
FLUSHDB
//remove all the data in all databases;
FLUSHALL
~~~