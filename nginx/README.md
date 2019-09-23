## Reverse Proxy
~~~
Clients visit the proxy server, which exposes the port to the clients, the real server's port is hidden.

//example, using http:www.123.com, via proxy 192.168.12.44:80, to access tomcat server port 127.0.0.1:8080
1.open the tomcat port for client to visit
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd -reload
firewall-cmd --list -all

2.local dist configure host file
vi c:/windows/system32/drivers/etc/HOSTS
192.168.12.44  www.123.com

3.request dispatch by configuring nginx.conf
server {
    listen 80;
    server_name 192.168.12.44;
    location / {
        root html;
        proxy_pass http://127.0.0.1:8080;
        index index.html index.htm;
    }
}
systemctrl nginx restart

//example 2
**when user input http://192.168.12.44:9001/edu/, jump to 127.0.0.1:8080**
**when user input http://192.168.12.44:9001/vod/, jump to 127.0.0.1:8081**

1.prepare two server
2.nginx.conf configuration
server {
    listen 9001;
    server_name 192.168.12.44;
    location ~ /edu/ {
        proxy_pass http://127.0.0.1:8080;
    }

    location ~ /vod/ {
        proxy_pass http://127.0.0.1:8081;
    }
}

firewall-cmd --add-port=8081/tcp --permanent
firewall-cmd -reload

~~~
## Load Balancing
~~~
Using mutiple servers to return the data request to Proxy, then proxy sends all of them to client
~~~
## Static && Dynamic Separation
~~~
Using specific servers to return Static resouces or Dynamic resources, static resources include Js,Css,Html
~~~
## Installation
~~~
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel

cd /usr/local/nginx/sbin
./nginx
ps -ef | grep nginx

firewall-cmd --list-all
sudo firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --reload
~~~
## Common Commands
~~~
cd /usr/local/nginx/sbin
//check the version of nginx
./nginx -v
//start && stop && restart nginx
./nginx
./nginx -s stop
./nginx -s reload
~~~
## Configurations
~~~
vi /usr/local/nginx/conf/nginx.conf

1.global block
worker_processes 1 //concurrent number

2.event block
the network connection between nginx server and client
worker_connections 1024;

3.http block
http server and global block

~~~