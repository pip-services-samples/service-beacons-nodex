import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { IBeaconsController } from './IBeaconsController';
export declare class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private _persistence;
    private _commandSet;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<BeaconV1>>;
    getBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1>;
    getBeaconByUdi(correlationId: string, beaconId: string): Promise<BeaconV1>;
    calculatePosition(correlationId: string, siteId: string, udis: string[]): Promise<any>;
    createBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1>;
    updateBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1>;
    deleteBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1>;
}
