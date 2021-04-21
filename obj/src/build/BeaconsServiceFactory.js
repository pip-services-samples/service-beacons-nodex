"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const BeaconsMemoryPersistence_1 = require("../../src/persistence/BeaconsMemoryPersistence");
const BeaconsFilePersistence_1 = require("../../src/persistence/BeaconsFilePersistence");
const BeaconsMongoDbPersistence_1 = require("../../src/persistence/BeaconsMongoDbPersistence");
const BeaconsController_1 = require("../../src/logic/BeaconsController");
const BeaconsHttpServiceV1_1 = require("../../src/services/version1/BeaconsHttpServiceV1");
class BeaconsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(BeaconsServiceFactory.MemoryPersistenceDescriptor, BeaconsMemoryPersistence_1.BeaconsMemoryPersistence);
        this.registerAsType(BeaconsServiceFactory.FilePersistenceDescriptor, BeaconsFilePersistence_1.BeaconsFilePersistence);
        this.registerAsType(BeaconsServiceFactory.MongoDbPersistenceDescriptor, BeaconsMongoDbPersistence_1.BeaconsMongoDbPersistence);
        this.registerAsType(BeaconsServiceFactory.ControllerDescriptor, BeaconsController_1.BeaconsController);
        this.registerAsType(BeaconsServiceFactory.HttpServiceV1Descriptor, BeaconsHttpServiceV1_1.BeaconsHttpServiceV1);
    }
}
exports.BeaconsServiceFactory = BeaconsServiceFactory;
BeaconsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('beacons', 'persistence', 'memory', '*', '1.0');
BeaconsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('beacons', 'persistence', 'file', '*', '1.0');
BeaconsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('beacons', 'persistence', 'mongodb', '*', '1.0');
BeaconsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor('beacons', 'controller', 'default', '*', '1.0');
BeaconsServiceFactory.HttpServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('beacons', 'service', 'http', '*', '1.0');
//# sourceMappingURL=BeaconsServiceFactory.js.map