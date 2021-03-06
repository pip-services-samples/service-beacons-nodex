import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class BeaconV1Schema extends ObjectSchema {
    
    public constructor()
    {
        super();

        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('site_id', TypeCode.String);
        this.withOptionalProperty('type', TypeCode.String);
        this.withRequiredProperty('udi', TypeCode.String);
        this.withOptionalProperty('label', TypeCode.String);
        this.withOptionalProperty('center', null);
        this.withOptionalProperty('radius', TypeCode.Float);
    }
}