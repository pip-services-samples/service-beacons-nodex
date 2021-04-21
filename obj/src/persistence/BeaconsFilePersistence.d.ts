import { JsonFilePersister } from 'pip-services3-data-nodex';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { BeaconsMemoryPersistence } from './BeaconsMemoryPersistence';
import { ConfigParams } from 'pip-services3-commons-nodex';
export declare class BeaconsFilePersistence extends BeaconsMemoryPersistence {
    protected _persister: JsonFilePersister<BeaconV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
