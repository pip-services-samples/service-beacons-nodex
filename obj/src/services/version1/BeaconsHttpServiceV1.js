"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsHttpServiceV1 = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class BeaconsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/beacons');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('beacons', 'controller', '*', '*', '1.0'));
    }
}
exports.BeaconsHttpServiceV1 = BeaconsHttpServiceV1;
//# sourceMappingURL=BeaconsHttpServiceV1.js.map