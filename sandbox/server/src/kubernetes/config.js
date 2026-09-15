import * as k8sApi from '@kubernetes/client-node';

const kc = new k8sApi.KubeConfig();
kc.loadFromDefault();

export const k8sCoreV1Api = kc.makeApiClient(k8sApi.CoreV1Api);

// This k8sCoreV1Api can be used to interact with the Kubernetes API server, for example, to create, read, update, and delete Kubernetes resources such as pods, services, and deployments.