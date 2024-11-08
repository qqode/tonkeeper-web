/* tslint:disable */
/* eslint-disable */
/**
 * Custodial-Battery REST API.
 * REST API for Custodial Battery which provides gas to different networks to help execute transactions.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const PoolImplementationType = {
    Whales: 'whales',
    Tf: 'tf',
    LiquidTf: 'liquidTF'
} as const;
export type PoolImplementationType = typeof PoolImplementationType[keyof typeof PoolImplementationType];


export function instanceOfPoolImplementationType(value: any): boolean {
    for (const key in PoolImplementationType) {
        if (Object.prototype.hasOwnProperty.call(PoolImplementationType, key)) {
            if (PoolImplementationType[key as keyof typeof PoolImplementationType] === value) {
                return true;
            }
        }
    }
    return false;
}

export function PoolImplementationTypeFromJSON(json: any): PoolImplementationType {
    return PoolImplementationTypeFromJSONTyped(json, false);
}

export function PoolImplementationTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): PoolImplementationType {
    return json as PoolImplementationType;
}

export function PoolImplementationTypeToJSON(value?: PoolImplementationType | null): any {
    return value as any;
}

export function PoolImplementationTypeToJSONTyped(value: any, ignoreDiscriminator: boolean): PoolImplementationType {
    return value as PoolImplementationType;
}
