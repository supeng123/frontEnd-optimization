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
## Data Type
~~~
String
Hash
List
Set
Hash
Zset
~~~
### Key
~~~
EXISTS key_name

move key_name db_name
//move k3 to database name 2,
move k3 2

// check the key's expiration time ,-1 reprents never expired, -2 reprents expired
expire key_name
ttl key_name

//check the type of key
type key_name
~~~
### String
~~~
set k1 ty
get k1  //ty
append k1 12345
get k1  //ty12345
STRLEN k1 // 7

set k2 2
INCR k2  //3
INCR k2  //4
DECR k2  //3
INCRBY k2 3 //6
DECRBY k2 2 //4

GETRANGE k1 0 -1  //ty12345
GETRANGE k1 0 3   //ty12

SETRANGE k1 0 xxx //xxx2345

//set the key expiration time
setex k4 10 v4  //set k4 expiration time for 10 seconds with value v4

//set value if not exist
setnx k1 v11 //will not succeeded becasue k1 has already existed

//mset mget msetnx
mset k4 v4 k5 v5 k6 v6
mget k4 k5 k6 //v4 v5 v6
msetnx k7 v7 k8 v8

~~~