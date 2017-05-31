---
title: Installing minikube and kubectl
updated: 2017-05-30 16:42
categories: kubernetes containers docker rkt coreos google-cloud minikube kubectl
---

# Background
Information detailing this post and those following it can be found at my previous [blog post]({{page.previous.url}}).

# Setup
To get started, you'll need to install tools for working with Kubernetes, Google Cloud, and a couple others for everything to work properly.

## 1. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
kubectl is a CLI for running commands against Kubernetes clusters. Run the following commands for your platform to install it.

### Linux/amd64
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

### MacOS
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

## 2. [gcloud](https://cloud.google.com/sdk/gcloud/)
This is the CLI for interacting with Google Cloud. This is not necessary if you plan on using another cloud service or just want to run kubernetes locally, but will be used in further posts.
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL # restart shell
```

## 3. [minikube](https://github.com/kubernetes/minikube)
Minikube is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day.

### Linux/amd64
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.19.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

### MacOS
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.19.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

### Configure minikube to use a specific release:
```
minikube config set kubernetes-version 1.6.3
```

### To verify minikube availability:

```
minikube start
```

### Troubleshooting minikube

If your minikube environment does not boot correctly:

Minikube requires an OS virtualization back-end
Most OSes include some support for virtualization
You can use the --vm-driver flag to select a specific virt provider
```
minikube start --vm-driver=virtualbox
```

You can use a variety of virtualization drivers such as virtualbox, but I will be using [xhyve](https://github.com/mist64/xhyve). It can be installed and setup properly on MacOS with the following commands:
```
brew install docker-machine-driver-xhyve
sudo chown root:wheel /usr/local/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
sudo chmod u+s /usr/local/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
```

### rkt-powered minikube (optional)
To start minikube with [rkt](github.com/rkt/rkt) enabled, run:
```
minikube start --network-plugin=cni --container-runtime=rkt
```

## 4. [Docker](https://www.docker.com/community-edition)
There are multiple ways to install docker's tools including the package found at the link above or with your OS's package manager. For example:
```
brew install docker
```

# Final
If minikube start is working, then you are all setup! If you are having any problems, reach out to the kubernetes community, refer to the docs, or get in touch with me. The next post will cover getting synced up with Google Cloud and connecting kubectl and minikube to that.
