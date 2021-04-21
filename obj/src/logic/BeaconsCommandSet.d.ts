import { CommandSet } from 'pip-services3-commons-nodex';
import { IBeaconsController } from '../../src/logic/IBeaconsController';
export declare class BeaconsCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IBeaconsController);
    private makeGetBeaconsCommand;
    private makeGetBeaconByIdCommand;
    private makeGetBeaconByUdiCommand;
    private makeCalculatePositionCommand;
    private makeCreateBeaconCommand;
    private makeUpdateBeaconCommand;
    private makeDeleteBeaconByIdCommand;
}
