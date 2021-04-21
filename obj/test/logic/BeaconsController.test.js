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
const BeaconTypeV1_1 = require("../../src/data/version1/BeaconTypeV1");
const BeaconsMemoryPersistence_1 = require("../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../src/logic/BeaconsController");
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
suite('BeaconsController', () => {
    let persistence;
    let controller;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        controller.configure(new pip_services3_commons_nodex_1.ConfigParams());
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_2.Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        yield persistence.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create the first beacon
        let beacon = yield controller.createBeacon(null, BEACON1);
        assert.isObject(beacon);
        assert.equal(BEACON1.udi, beacon.udi);
        assert.equal(BEACON1.site_id, beacon.site_id);
        assert.equal(BEACON1.type, beacon.type);
        assert.equal(BEACON1.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Create the second beacon
        beacon = yield controller.createBeacon(null, BEACON2);
        assert.isObject(beacon);
        assert.equal(BEACON2.udi, beacon.udi);
        assert.equal(BEACON2.site_id, beacon.site_id);
        assert.equal(BEACON2.type, beacon.type);
        assert.equal(BEACON2.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Get all beacons
        let page = yield controller.getBeacons(null, new pip_services3_commons_nodex_4.FilterParams(), new pip_services3_commons_nodex_5.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        let beacon1 = page.data[0];
        // Update the beacon
        beacon1.label = 'ABC';
        beacon = yield controller.updateBeacon(null, beacon1);
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        assert.equal('ABC', beacon.label);
        // Get beacon by udi
        beacon = yield controller.getBeaconByUdi(null, beacon1.udi);
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        // Delete the beacon
        beacon = yield controller.deleteBeaconById(null, beacon1.id);
        assert.isObject(beacon);
        assert.equal(beacon1.id, beacon.id);
        // Try to get deleted beacon
        beacon = yield controller.getBeaconById(null, beacon1.id);
        assert.isNull(beacon || null);
    }));
    test('Calculate Positions', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create the first beacon
        let beacon = yield controller.createBeacon(null, BEACON1);
        assert.isObject(beacon);
        assert.equal(BEACON1.udi, beacon.udi);
        assert.equal(BEACON1.site_id, beacon.site_id);
        assert.equal(BEACON1.type, beacon.type);
        assert.equal(BEACON1.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Create the second beacon
        beacon = yield controller.createBeacon(null, BEACON2);
        assert.isObject(beacon);
        assert.equal(BEACON2.udi, beacon.udi);
        assert.equal(BEACON2.site_id, beacon.site_id);
        assert.equal(BEACON2.type, beacon.type);
        assert.equal(BEACON2.label, beacon.label);
        assert.isNotNull(beacon.center);
        // Calculate position for one beacon
        let position = yield controller.calculatePosition(null, '1', ['00001']);
        assert.isObject(position);
        assert.equal('Point', position.type);
        assert.lengthOf(position.coordinates, 2);
        assert.equal(0, position.coordinates[0]);
        assert.equal(0, position.coordinates[1]);
        // Calculate position for two beacons
        position = yield controller.calculatePosition(null, '1', ['00001', '00002']);
        assert.isObject(position);
        assert.equal('Point', position.type);
        assert.lengthOf(position.coordinates, 2);
        assert.equal(1, position.coordinates[0]);
        assert.equal(1, position.coordinates[1]);
    }));
});
//# sourceMappingURL=BeaconsController.test.js.map