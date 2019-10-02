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
lsof 6379
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
### List
~~~
//lpush rpush lrange

LPUSH list01 1 2 3 4 5
LRANGE list01 0 -1 //5,4,3,2,1

RPUSH list02 1 2 3 4 5
LRANGE list02 0 -1 //1,2,3,4,5

//lpop rpop
LPOP list01  //5
LPOP list02  //1
RPOP list01  //1
RPOP list02  //5

//lindex
LINDEX list01  3// nil
LINDEX list01  2// 2

//llen
LLEN list01 //3

//lrem to remove the number of the value
RPUSH list03 1 2 3 3 3 4 5
LREM list03 2 3// 1,2,3,4,5 **remove 2 times of 3

//trim the list and put the trimed part to list
LPUSH list05 0 1 2 3 4 5 6 7 8 9
LTRIM list05 3 5
LRANGE list05 0 -1 //6 5 4

//rpoplpush
list01 1 2 3 4
list02 5 6 7 8
RPOPLPUSH list01 list02 //4 5 6 7 8

//lset key index value
list01 1 2 3 4
LSET list01 1 xy //1 xy 3 4

//linsert key before/after
list01 1 2 3 4
LINSET list01 before 2 su //1 su 2 3 4
LINSET list01 after 2 peng // 1 su 2 peng 3 4
~~~
### Set
~~~
SADD set01 1 2 3 2 3 // 1 2 3
SISMEMBER set01 1 // 1
SISMEMBER set01 4 // 0

//get the set numbers
SCARD set01 //3

//remove the key value
SREM set01 3

//set random member from the set
SRANMEMBER set01 2 // 1 2

//random pop out the memer of set
SPOP set01

//move member of key1 to key2
SDAA set01 1 3 4
SDAA set02 x y z
SMOVE set01 set02 4 
SMEMBERS set02 // x y z 4

//sdiff sinter sunion
SDIFF set01 set02
SINTER set01 set02
SUNION set01 set02
~~~
### Hash
~~~
//hset hget
HSET hash01 id 11
HGET hash01 id // 11

//hmset hget hgetall
HMSET customer id 11 name supeng age 15
HMGET customer id name age //11 
HGETALL customer
HDEL customer name

//length of memner
HLEN customer //3

//check if memeber exists
HEXISTS customer id //1

//hkeys hvals
HKEYS customer
HVALS customer

//hincrby hincrbyfloat
HINCRBY customer age 2 // 13

//hsetnx, set if not exist
HSETNX customer score 111 // 1
~~~
### Zset(sorted set)
add value based on set
~~~
ZADD zset01 50 v1 60 v2 70 v3 80 v4 90 v5

//zrangebyscore (**********)
ZRANGEBYSCORE zset01 60 90 //v2 v3 v4 v5
**(
ZRANGEBYSCORE zset01 60 (90 //v2 v3 v4
**Limit
ZRANGEBYSCORE zset01 60 (90 limit 2 2//v2 v3

//remove
ZREM zset01 v5 //remove v5 value
ZRANGE zset01 0 -1 withscores

ZCOUNT zset01 60 80 //3
ZRANK zset01 v4 //3
ZSCORE zset01 v4 //90
~~~
## Redis Configuration
~~~
vi redis.conf

**GENERAL
daemonize yes
logfile stdout
Tcp-keepalive 60
syslog-ident redis
syslog-enbled yes
databases 16
dir ./
maxclients 128
appendonly no

//get passport of redis
config get requirepass
auth password_name

//LIMITS
Maxmemory-policy (Volatile-lru|Allkeys-lru|random|volatile-ttl|noeviction)
~~~
### Redis RDB(Redis DataBase)
~~~
fork child process to deal with IO, dump.rbd is the file, need to configure the 
snapshot position in redis.conf file.
save 120 10
Stop-writes-on-bgsave-error yes
rdbcompression yes
rbdchecksum yes
dir

**disadvantages : may lost the last version of data
**advantages save large quantity data
~~~
### Redis AOF(Append Only File)
~~~
save all the write IO, the priority of AOF is higher than RDB,
appendonly yes
auto-aof-rewrite-min-size 5G

execute redis-check-aof --fix appendonly.aof to restore the data
~~~
## Transaction
~~~
~~~