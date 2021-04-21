"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const BeaconTypeV1_1 = require("../../../src/data/version1/BeaconTypeV1");
const BeaconsMemoryPersistence_1 = require("../../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../../src/logic/BeaconsController");
const BeaconsHttpServiceV1_1 = require("../../../src/services/version1/BeaconsHttpServiceV1");
const BEACON1 = {
    id: '1',
    udi: '00001',
    type: BeaconTypeV1_1.BeaconTypeV1.AltBeacon,
    site_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
};
const BEACON2 = {
    id: '2',
    udi: '00002',
    type: BeaconTypeV1_1.BeaconTypeV1.iBeacon,
    site_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
suite('BeaconsHttpServiceV1', () => {
    let persistence;
    let controller;
    let service;
    let client;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        let restConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.port', 3000, 'connection.host', 'localhost');
        persistence = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        controller.configure(new pip_services3_commons_nodex_1.ConfigParams());
        service = new BeaconsHttpServiceV1_1.BeaconsHttpServiceV1();
        service.configure(restConfig);
        client = new pip_services3_rpc_nodex_1.TestCommandableHttpClient('v1/beacons');
        client.configure(restConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_2.Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_2.Descriptor('beacons', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield persistence.open(null);
        yield service.open(null);
        yield client.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
        yield service.close(null);
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        let beacon1;
        // Create the first beacon
        let beacon = yield client.callCommand('create_beacon', null, {
            beacon: BEACON1
        });
        assert.isObject(beacon);
        assert.equal(BEACON1.udi, beacon.udi);
        assert.equal(BEACON1.site_id, beacon.site_id);
        assert.equal(BEACON1.type, beacon.type);
        assert.equal(BEACON1.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Create the second beacon
        beacon = yield client.callCommand('create_beacon', null, {
            beacon: BEACON2
        });
        assert.isObject(beacon);
        assert.equal(BEACON2.udi, beacon.udi);
        assert.equal(BEACON2.site_id, beacon.site_id);
        assert.equal(BEACON2.type, beacon.type);
        assert.equal(BEACON2.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Get all beacons
        let page = yield client.callCommand('get_beacons', null, {
            filter: new pip_services3_commons_nodex_4.FilterParams(),
            paging: new pip_services3_commons_nodex_5.PagingParams()
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        beacon1 = page.data[0];
        // Update the beacon
        beacon1.label = 'ABC';
        beacon = yield client.callCommand('update_beacon', null, {
            beacon: beacon1
        });
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        assert.equal('ABC', beacon.label);
        // Get beacon by udi
        beacon = yield client.callCommand('get_beacon_by_udi', null, {
            udi: beacon1.udi
        });
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        // Calculate position for one beacon
        let position = yield client.callCommand('calculate_position', null, {
            site_id: '1',
            udis: ['00001']
        });
        assert.isObject(position);
        assert.equal('Point', position.type);
        assert.lengthOf(position.coordinates, 2);
        assert.equal(0, position.coordinates[0]);
        assert.equal(0, position.coordinates[1]);
        // Delete the beacon
        beacon = yield client.callCommand('delete_beacon_by_id', null, {
            beacon_id: beacon1.id
        });
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        // Try to get deleted beacon
        beacon = yield client.callCommand('get_beacon_by_id', null, {
            beacon_id: beacon1.id
        });
        assert.isNull(beacon || null);
    }));
});
//# sourceMappingURL=BeaconsHttpServiceV1.test.js.map