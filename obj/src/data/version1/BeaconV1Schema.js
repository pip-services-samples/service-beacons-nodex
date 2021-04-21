"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class BeaconV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('site_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('udi', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('label', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('center', null);
        this.withOptionalProperty('radius', pip_services3_commons_nodex_2.TypeCode.Float);
    }
}
exports.BeaconV1Schema = BeaconV1Schema;
//# sourceMappingURL=BeaconV1Schema.js.map