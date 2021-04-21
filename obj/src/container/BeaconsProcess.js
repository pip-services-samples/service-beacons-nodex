"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const BeaconsServiceFactory_1 = require("../build/BeaconsServiceFactory");
class BeaconsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super('beacons', 'Beacons microservice');
        this._factories.add(new BeaconsServiceFactory_1.BeaconsServiceFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory());
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory());
    }
}
exports.BeaconsProcess = BeaconsProcess;
//# sourceMappingURL=BeaconsProcess.js.map