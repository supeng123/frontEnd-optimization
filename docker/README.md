Docker
~~~
keep the consistence between different environment
container is the instance of image
~~~

## Basic Commands
~~~
**start container
docker run IMAGE[COMMAND][ARG...]
-i --interactive=true|false
-t --tty=true|false

docker inspect CONTAINER
docker ps -al
docker run --name=container01 -i -t IMAGE /bin/bash
docker start -i container01
docker rm container01


**CTRL+P CTL+Q to exit without terminate the container
docker run --name container02 -d IMAGE /bin/bash
-d run from the behind

**check logs
docker logs [-f]-[t][-tail] CONTAINER_NAME
-f --follows=true|false
-t --timestamps=true|false
--tail='all'

**check process in container
docker top CONTAINER_NAME

**start new process in container
docker exec [-d][-i][-t] CONTAINER_NAME

**stop container
docker stop container02
docker kill contianer02
~~~
### nginx setting by docker
~~~
** steps
1.create interactive container with opened port 80
2.install nginx
3.create static page
4.modify the configuration of Nginx
5.run Nginx
6.verify the status by visiting the page

1.docker run -p 80 --name nginx-web -i -it IMAGE_NAME /bin/bash
2.apt-get install -y nginx
3.mkidr -p /var/www/hmtl && cd /var/www/html && vim index.html
4.vim /etc/nginx/sites-enabled/default
    change root /var/www/html
5.nginx

//check the port info
docker port nginx-web
//check the container port
docker inspect nginx-web
//IPAddress is the container ip address
//docker exec nginx-web nginx to restart the nginx process 
~~~
## Docker Images
~~~
docker images [OPTIONS][REPSITORY]
-a --all=false
-f --filter=[]
--no-trunc
-q --quiet=false

docker rmi IMAGE_NAME
docker inspect IMAGE_NAME

//find the images in repository
docker search[OPTIONS] IMAGE_NAME
--automated=false
--no-trunc=false
-s --starts=0
//example
docker search -s 3 ubuntu

//pull image from remote repository
docker pull [OPTIONS] IMAGE_NAME:[TAG]
** --registry-mirror 
1.modify docker configuration. vim /etc/default/docker
2.add   DOCKER_OPTS="--registry-mirror=http://MIRROR_ADDR"

//push images from local 
docker push dormacypress/nginx

//create new image from container
docker commit [OPTION] CONTAINER_NAME [REPOSITORY[TAG]]
-a --author
-m --message
-p --pause=true

docker commit -a 'supeng' -m 'nginx' commit_test supeng/nginx-test
~~~
### docker process
~~~
vi etc/default/docker
DOCKER_OPTS="label name=docker_server_1"

sudo service docker restart
docker status
docker info
~~~
### docker remote visit
~~~
//create other server with docker and named DOCKER_OPTS="label name=docker_server_2"
//for docker_server_1,  create"DOCKER_OPTS="label name=docker_server_2 -H tcp"//0.0.0.0:2375""
//or export DOCKER_HOST="tcp://server1_hostname:2375"
//sever2 now can be connectted to server1 by useing "docker -H tcp://server1_hostname:2375"
~~~
## Docker file
~~~
** FROM <image>:<tag>   FROM ubuntu:14.04
** MAINTAINER<name>     MAINTAINER supeng "supeng@QQ.COM"
** RUN<command>         RUN apt-get update && apt-get install -y nginx
** EXPOSE<port>         EXPOSE 80

//RUN (shell mode)  /bin/sh -c command  
*example    RUN echo hello
//RUN (exec mode)  RUN["executable", "param1", "param2"]
*example    RUN ["/bin/bash", "-c", "echo hello"]

//can be overwrite by the commands from command line
**CMD ["executable", "param1", "param2"]
**CMD command param1 param2

//won't be overwrite by the commands from command line，only one Entrypoint in one docker file
//only with --entrypoint in "docker run -it --entrypoint='/bin/bash'"
**ENTRYPOINT 
*example    ENTRYPOINT["/etc/default/nginx", '-g', "deamo off"]

**WORKDIR 
**ENV
**USER daemon
**ONBUILD [INSTRUCTION] , execute commands when one image be used as other image's base

*example ONBUILD COPY index.html /usr/share/nginx/html

~~~
## Docker Bridge
~~~
sudo apt-get install bridge-utils
//check bridge device
sudo brctl show
//modify the new ip address for container
sudo ifconfig docker0 192.168.200.1 netmask 255.255.255.0

//diy a virtual bridge
sudo brctl addbr bridge0
sudo ifconfig bridge0 192.168.100.1 netmask 255.255.255.0
sudo vim /etc/default
    DOCKER_OPTS="bridge0"
sudo service docker restart
~~~
### communication between containers
~~~
-icc=true
--iptables=true

1.docker run -it --name cct1 dormacypress/cct
2.systctl nginx start
3.CTRL+P
//check the cct1's ip address is 192.168.0.9 by using ifconfig
4.docker run -it --name cct2 dormacypress/cct
5.ping 192.168.0.9

//use link so container's port can be automatically switched if container is down and up again
--link
$docker run --link=[CONTAINER_NAME]:[ALIAS] [IMAGE][COMMAND]

docker run --name cct3 --link=cct1:webtest dormacypress/cct
ping webtest
~~~
### container connect to external network
~~~
//check if the traffic can be forwaring
ip-forward=true
sysctl net.ipv4.conf.all.forwarding

iptables -L -n
**"docker port cct5" can get the reflective port of container

//prevent one ip to connect to other container ip(-s is the ip should be prevented)
sudo iptables -I DOCKER -s 10.211.55.3 -d 172.17.0.7 -p TCP --dport 80 -j DROP
~~~
## Volume
~~~
//add volume for container
sudo docker run -v ~/host_volume_data:/container_data -t ubuntu /bin/bash

docker run -it -v ~/datavolume:/data ubuntu /bin/bash

//add read only for container volume
docker run -it -v ~/datavolume:/data:ro ubuntu /bin/bash

//mount data volume container so all the data can be stored regardless what happened on containers
docker run --volumes-from [CONTAINER_NAME]

docker run -it --name dvt5 --volumes-from dvt4 ubuntu /bin/bash

//backup
docker run --volumes-from dvt5 -v ~/host/backup:/containerBackup --name dvt6 tar cvf /backup/dvt5.tar /datavolume1
~~~
## Cross Host Communication
~~~
apt-get install openvswitch-switch
apt-get install bridge-utils
//1.create ovs bridge obr0
sudo ovs-vsctl add-br obr0
//2.add port for obr0
sudo ovs-vsctl add-port obr0 gre0
//3.set interface
sudo ovs-vsctl set interface gre0 type=gre options:remote_ip=192.168.59.104

//4.local machine bridge
sudo brctl addbr br0
sudo ifconfig br0 192.168.1.1 netmask 255.255.255.0
sudo brctl addif br0 obr0
sudo brctl show

//5.modify docker file
sudo vim /etc/default/docker

//in host one
sudo wget -O /usr/bin/weav https://raw.githubusercontent.com
sudo chmod a+x /usr/bin/weave
weave launch
weave run 192.168.1.10/24 -it --name wc1 ubuntu /bin/bash
docker attach wc1
ping 192.168.1.2


//in host two use weave
sudo wget -O /usr/bin/weav https://raw.githubusercontent.com
sudo chmod a+x /usr/bin/weave
weave launch host_one_ip
c2=$(weave run 192.168.1.2/24 -it ubuntu /bin/bash) 
docker attach $c2
~~~