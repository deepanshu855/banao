import {k8sCoreV1Api} from './config.js';

export const createService= async(sandboxId)=>{

    const serviceManifest={
        metadata:{
            name:`sandbox-service-${sandboxId}`,
            labels:{
                app: 'sandbox',
                sandboxId: sandboxId
            }
        },
        spec:{
            selector:{
                app: 'sandbox',
                sandboxId: sandboxId
            },
            ports:[
                {
                    protocol: "TCP",
                    port: 5173,
                    targetPort: 5173,
                    name: "http"
                }
            ],
            type: "ClusterIP"
        }
    }

    const response = await k8sCoreV1Api.createNamespacedService({
        namespace: "default",
        body: serviceManifest
    });

    return response;
}