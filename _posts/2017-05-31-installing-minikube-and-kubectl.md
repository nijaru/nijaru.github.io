---
title: Installing minikube and kubectl
updated: 2017-05-31 13:28
categories: kubernetes containers docker rkt coreos google-cloud minikube kubectl
---

# Background
Information detailing this post and those following it can be found at my previous [blog post]({{page.previous.url}}).

# Setup
To get started, you'll need to install tools for working with Kubernetes, Google Cloud, and a couple others for everything in these guides to work properly.

## 1. [Docker](https://www.docker.com/community-edition)
To use Kubernetes, you are going to need a container runtime. I assume most of you are already familiar with docker, although there are alternatives such as [rkt](https://github.com/rkt/rkt) as well. You can install the docker tools through their website or through your OS's package manager. For example:

```
brew install docker
```

You will also need a virtualization driver, as minikube runs kubernetes inside of a VM locally. You can use a variety of virtualization drivers such as virtualbox, but I will be using [xhyve](https://github.com/mist64/xhyve) on my mac. It can be installed and setup with the following commands:
```
brew install docker-machine-driver-xhyve

sudo chown root:wheel /usr/local/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve

sudo chmod u+s /usr/local/opt/docker-machine-driver-xhyve/bin/docker-machine-driver-xhyve
```

## 2. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
You can use the Kubernetes command-line tool, kubectl, to deploy and manage applications on Kubernetes. Using kubectl, you can inspect cluster resources; create, delete, and update components; and look at your new cluster and bring up example apps.

Run the following commands for your platform to install it.

### Linux/amd64
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

### MacOS

You can install it through the following command or with Homebrew

#### Command
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
```

#### Homebrew
```
brew install kubectl
```

## 3. [Minikube](https://github.com/kubernetes/minikube)
Minikube is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day.

Run the following commands for your platform to install it.

### Linux/amd64
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.19.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

### MacOS

You can install it through the following command or with Homebrew

#### Script
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.19.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

#### Homebrew
```
brew cask install minikube
```

## 4. [gcloud](https://cloud.google.com/sdk/gcloud/)
This is the CLI for interacting with Google Cloud. This is not necessary if you just want to run kubernetes locally or if you plan to use another cloud provider, but it will be used in further posts.
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL # restart shell
```

## Using Minikube

### Configure minikube to use a specific release:
Feel free to skip this step, but this is the current version I am using.
```
minikube config set kubernetes-version 1.6.3
```

### To verify minikube availability:

```
minikube start
```

Minikube requires an OS virtualization back-end. You can use the --vm-driver flag to specify a VM driver such as xhyve.
```
minikube start --vm-driver=xhyve
```

### rkt-powered minikube (optional)
To start minikube with [rkt](https://github.com/rkt/rkt) enabled, run:
```
minikube start --network-plugin=cni --container-runtime=rkt
```

# Final
If minikube start is working, then you are all setup! If you are having any problems, reach out to the kubernetes community, refer to the docs, or get in touch with me. The next post will cover more of kubectl and minikube.
