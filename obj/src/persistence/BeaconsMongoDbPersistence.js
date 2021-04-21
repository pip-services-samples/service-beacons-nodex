"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class BeaconsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('beacons');
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ _id: id });
        }
        let siteId = filter.getAsNullableString('site_id');
        if (siteId != null) {
            criteria.push({ site_id: siteId });
        }
        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push({ label: label });
        }
        let udi = filter.getAsNullableString('udi');
        if (udi != null) {
            criteria.push({ udi: udi });
        }
        let udis = filter.getAsObject('udis');
        if (typeof udis === "string") {
            udis = udis.split(',');
        }
        if (Array.isArray(udis)) {
            criteria.push({ udi: { $in: udis } });
        }
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        return super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
    getOneByUdi(correlationId, udi) {
        let criteria = {
            udi: udi
        };
        return new Promise((resolve, reject) => {
            this._collection.findOne(criteria, (err, item) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                if (item != null)
                    this._logger.trace(correlationId, "Found beacon by %s", udi);
                else
                    this._logger.trace(correlationId, "Cannot find beacon by %s", udi);
                item = this.convertToPublic(item);
                resolve(item);
            });
        });
    }
}
exports.BeaconsMongoDbPersistence = BeaconsMongoDbPersistence;
//# sourceMappingURL=BeaconsMongoDbPersistence.js.map