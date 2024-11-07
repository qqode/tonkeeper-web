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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApyHistory
 */
export interface ApyHistory {
    /**
     * 
     * @type {number}
     * @memberof ApyHistory
     */
    apy: number;
    /**
     * 
     * @type {number}
     * @memberof ApyHistory
     */
    time: number;
}

/**
 * Check if a given object implements the ApyHistory interface.
 */
export function instanceOfApyHistory(value: object): value is ApyHistory {
    if (!('apy' in value) || value['apy'] === undefined) return false;
    if (!('time' in value) || value['time'] === undefined) return false;
    return true;
}

export function ApyHistoryFromJSON(json: any): ApyHistory {
    return ApyHistoryFromJSONTyped(json, false);
}

export function ApyHistoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApyHistory {
    if (json == null) {
        return json;
    }
    return {
        
        'apy': json['apy'],
        'time': json['time'],
    };
}

  export function ApyHistoryToJSON(json: any): ApyHistory {
      return ApyHistoryToJSONTyped(json, false);
  }

  export function ApyHistoryToJSONTyped(value?: ApyHistory | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'apy': value['apy'],
        'time': value['time'],
    };
}

