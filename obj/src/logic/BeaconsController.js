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
exports.BeaconsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const BeaconTypeV1_1 = require("../../src/data/version1/BeaconTypeV1");
const BeaconsCommandSet_1 = require("./BeaconsCommandSet");
class BeaconsController {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services3_commons_nodex_2.Descriptor('beacons', 'persistence', '*', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new BeaconsCommandSet_1.BeaconsCommandSet(this);
        }
        return this._commandSet;
    }
    getBeacons(correlationId, filter, paging) {
        return this._persistence.getPageByFilter(correlationId, filter, paging);
    }
    getBeaconById(correlationId, beaconId) {
        return this._persistence.getOneById(correlationId, beaconId);
    }
    getBeaconByUdi(correlationId, beaconId) {
        return this._persistence.getOneByUdi(correlationId, beaconId);
    }
    calculatePosition(correlationId, siteId, udis) {
        return __awaiter(this, void 0, void 0, function* () {
            if (udis == null || udis.length == 0) {
                return null;
            }
            let page = yield this._persistence.getPageByFilter(correlationId, pip_services3_commons_nodex_1.FilterParams.fromTuples('site_id', siteId, 'udis', udis), null);
            let beacons = page.data || [];
            let lat = 0;
            let lng = 0;
            let count = 0;
            for (let beacon of beacons) {
                if (beacon.center != null
                    && beacon.center.type == 'Point'
                    && Array.isArray(beacon.center.coordinates)) {
                    lng += beacon.center.coordinates[0];
                    lat += beacon.center.coordinates[1];
                    count += 1;
                }
            }
            if (count == 0) {
                return null;
            }
            let position = {
                type: 'Point',
                coordinates: [lng / count, lat / count]
            };
            return position;
        });
    }
    createBeacon(correlationId, beacon) {
        beacon.id = beacon.id || pip_services3_commons_nodex_3.IdGenerator.nextLong();
        beacon.type = beacon.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        return this._persistence.create(correlationId, beacon);
    }
    updateBeacon(correlationId, beacon) {
        beacon.type = beacon.type || BeaconTypeV1_1.BeaconTypeV1.Unknown;
        return this._persistence.update(correlationId, beacon);
    }
    deleteBeaconById(correlationId, beaconId) {
        return this._persistence.deleteById(correlationId, beaconId);
    }
}
exports.BeaconsController = BeaconsController;
//# sourceMappingURL=BeaconsController.js.map