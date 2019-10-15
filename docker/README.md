docker

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
~~~