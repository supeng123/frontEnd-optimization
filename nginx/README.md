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
**strategy(epoch|weight|ip_hash|fair)
http {
    upstream myserver {
        server 192.168.17.129:8080 weight 5;
        server 192.168.17.129:8081 weight 10;
    }

    server {
        listen 80;
        server_name 192.168.17.129;

        location / {
            proxy_pass http://myserver;
            root html;
            index index.html index.htm;
        }
    } 
}
~~~
## Static && Dynamic Separation
~~~
Using specific servers to return Static resouces or Dynamic resources, static resources include Js,Css,Html
**visit the static resouces in root directory /data/
server {
        listen 80;
        server_name 192.168.17.129;

        location /www/ {
            root /data/;
            index index.html index.htm;
        }
        location /image/ {
            root /data/;
            autoindex on;
        }
    } 
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
## Static Resources
~~~
** sendfile
** tcp_nopush
** tcp_nodelay
** gzip
** gzip_comp_level

** expires
** add_header
** http_refer

server {
    listen 80;
    server_name 192.168.17.129;
    sendfile on;
    access_log /var/log/nginx/static_access.log main;

    location ~ .*\.(jpg|gif|png)$ {
        expires 30d;
        gzip on;
        gzip_comp_level 2;
        root /soft/code/images;
        gzip_types text/plain application/json application/x-javascript image/gif image/jpeg;
    }
}

server {
    listen 80;
    server_name 192.168.17.129;
    sendfile on;
    access_log /var/log/nginx/static_access.log main;

    location ~ .*\.(txt|xml)$ {
        add_header Access-Control-Allow-Origin http://www.otherWebsiteName.com;
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELET,OPTIONS;
        //only 192.168.69.112 can use this resource
        valid_refers none blocked 192.168.69.112;
        if ($valid_refers) {
            return 403;
        }
        gzip on;
        gzip_comp_level 2;
        root /soft/code/doc;
        gzip_types text/plain application/json application/x-javascript image/gif image/jpeg;
    }
}

~~~
## Nginx Crash Solution
~~~
//using backups in case some nginx servers crash
1.install multiple nginx in each server.
2.install keepalived
3.modify keepalive configuration
vi keepalived.conf

global_defs {
    smtp_server 192.168.17.129
    smtp_connect_timeout 30

    router_id LVS_DEVELBACK
}

vrrp_script chk_http_port {
    script "/usr/local/src/nginx_check.sh"
    interval 2
    weight 2
}

vrrp_instance VI_l {
    state BACKUP //MASTER if it's the main serve
    interface ens33
    virtual_router_id 51
    priority 90
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.17.50
    }
}

vi nginx_check.sh
#!/bin/bash
A=`ps -C nginx -no-header |wc -l`
if [$A -eq 0];then
    /usr/local/nginx/sbin/nginx
    sleep 2
    if[`ps -C nginx --no-header |wc -l` -eq 0]; then
        killall keepalived
    fi
fi

4. start nginx and keepalived

visit 192.168.17.50
~~~
## Nginx Cache
~~~
** via proxy 192.168.69.112 to visit resources in 192.168.69.113
proxy_cache_path /soft/cache levels=1:2 keys_zone=code_cache:10m max_size=10g inactive=60m use_tmp_path=off;
upstream cache {
    server 192.168.69.113:8081;
    server 192.168.69.113:8081;
    server 192.168.69.113:8081;
}

server {
    listen 8081;
    server_name 192.168.69.112;
    root /soft/code1;
    index index.html;

    if ($request_uri ~ ^/(url_name|login|register|password)) {
        set $cookie_nocache 1;
    }

    location / {
        proxy_pass httpp://cache;
        proxy_cache code_cache;
        proxy_cache_valid 200 304 12h;
        proxy_cache_valid any 10m;
        proxy_no_cache $cookie_nocache $arg_nocache $arg_comment;
        add_header Nginx-Cache "$upstream_cache_status";
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        include proxy_params;
    }
}
~~~
## Nginx Rewrite
~~~
//for seo and maintainace psudo static pages
//last will redirect to /test/, but break can not
location ~ ^/break {
    rewrite ^/break /test/ break;
}
location ~ ^/last{
    rewrite ^/last /test/ last;
}

location ~ ^/bgx{
    rewrite ^/bgx http://kt.gergerg.com redirect;//temparary
    rewrite ^/bgx http://kt.gergerg.com permanent;
}

//via /course/11-22-33.html to get the real /course/11/22/33.html
location / {
    rewrite ^/course-(\d+)-(\d+)-(\d+)\.html /course/$1/$2course_$3.hmtl
}
~~~
## Nginx HTTPS
~~~
1.generate private key
openssl genrsa -idea -out server.key 2048
2.generate signiture request certificate and private key self-signiture certificate
openssl req -days 36500 -x509 -sha256 -nodes -newkey rsa:2048 -keyout server.key -out server.crt

server {
    listen 443;
    server_name localhost;
    ssl on;
    index index.html index.htm;
    ssl_session_timeout 10m;
    ssl_certificate ssl_key/server.crt;
    ssl_certificate_key ssl_key/server.key;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2
    ssl_prefer_server_ciphers on;

    location / {
        root /soft/code;
        access_log var/logs/nginx/ssl.log main;
    }
}

//http jump to https
server {
    listen 80;
    server_name www.bsgege.com;
    rewrite ^(.*) https://$server_name$1 redirect;
}
~~~