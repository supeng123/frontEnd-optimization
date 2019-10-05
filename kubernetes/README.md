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