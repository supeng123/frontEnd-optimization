## Kubernetes Structure
~~~
APISERVER ** the entry of the all services
ControllerManager **maintain the expected copys of port
Scheduler ** dipatch the task, select the appropraite node to deal with task
ETCD ** key value database, store the important info about cluster
Kubelet ** interact with engine of containers and manage the life cycle of containers
Kube-proxy ** writing rules to IPTABLES, IPVS, implement the server mapping

COREDNS: DNA resolution of IP for cluster's SVC
DASHBOARD: provide the visiting system for K8s cluster
INGRESS CONTROLLER: provide seven level proxy
FEDERATION: provide the manager tool across multiple clusters
PROMETHEUS: provide the monitoring functions for K8s
ELK: provide log anaylisis platform
~~~
## Kubernetes installation
~~~
kubeadm config print init-defaults > kubeadm-config.yaml

localAPIEndpoint:
    advertiseAddress: 192.168.66.10
kubernetesVersion: v1.15.1
networking:
    potSubnet: "10.244.0.0/16" //for flannel

apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
featureGates:
    SupportIPVSPrxoyMode: true
mode: ipvs

kubeadmin init --config-kubeadmin-config.yaml --experimental-upload-certs | tee kubeadm-init.log

kubectl get pot -n kube-system
got node
~~~
## Kubernetes Resource
~~~
namespace: kubeadm k8s pot, replicaSet, deployment, statefulSet, daemonSet, cronJob
cluser: Node,Role, ClusterRole
metadata: HPA, PodTemplate,limitRange
~~~
 ### yaml
 ~~~
 apiVersion: v1
 kind: Pod  //Pod ,service, deployment
 metadata
 metadata.name //podname
 metadata.namespace //
 Spec
 spec.containers[]
 spec.containers[].name //container name
 spec.containers[].image //container image
 ~~~
 #### check pot log
 ~~~
 kuberctl get pod
 kuberctl create -f pod.yaml //start a yaml resource
 get pod -o wide //check pod info
 kubectl log myapp-pod(port) -c test(name)

 kuberctl exec port_name -it -- /bin/sh
 ~~~
 ### port life cycle
 ~~~
init c
main c

readness // check the container's service (apache)of pod is ready for open to the client to visit
liveness // check the container's service (nginx) process is dead in pod
probe
 ~~~
 ## Resource Controller
 ~~~
 ReplicatsSet, ensure the specific numbers of the copy of the container
 Deployment, declare ReplicatsSet, to create Pod ,support rollback,extension of Pod
 DaemonSet, ensure only one Pod copy execting on all Node
 CronJob, execute the scripts during the time interval
 StatefulSet, provide identification for Pod, ensure the sequence of deployment and scale
 ~~~
 ### ReplicateSet && Deployment && DaemonSet
 ~~~
 kubectl get deployment
 kubectl get rs
 kubectl get pod
 kubectl get pod -o wide

 //scale by deployment
 kubectl scal deployment nginx-deployment --replicas 10
 //modify the image in container
 kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
 //rollback
 kubectl rollout undo deployment/nginx-deployment
 ~~~
 ### Service
 ~~~
 ensure the proxy for Pods be consistent even some pods destoryed unexpectly

 ClusterIP, setup in cluster
 NodePort, setup in physical machine
 LoadBalancer, setup in cloud providers
 ExternalName

 kubeApiserver--->kube-proxy--->ServiceIP(iptables|ipvs)
 ~~~
