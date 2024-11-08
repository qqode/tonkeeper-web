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
import type { DecodedRawMessageMessage } from './DecodedRawMessageMessage';
import {
    DecodedRawMessageMessageFromJSON,
    DecodedRawMessageMessageFromJSONTyped,
    DecodedRawMessageMessageToJSON,
    DecodedRawMessageMessageToJSONTyped,
} from './DecodedRawMessageMessage';

/**
 * 
 * @export
 * @interface DecodedRawMessage
 */
export interface DecodedRawMessage {
    /**
     * 
     * @type {DecodedRawMessageMessage}
     * @memberof DecodedRawMessage
     */
    message: DecodedRawMessageMessage;
    /**
     * 
     * @type {number}
     * @memberof DecodedRawMessage
     */
    mode: number;
}

/**
 * Check if a given object implements the DecodedRawMessage interface.
 */
export function instanceOfDecodedRawMessage(value: object): value is DecodedRawMessage {
    if (!('message' in value) || value['message'] === undefined) return false;
    if (!('mode' in value) || value['mode'] === undefined) return false;
    return true;
}

export function DecodedRawMessageFromJSON(json: any): DecodedRawMessage {
    return DecodedRawMessageFromJSONTyped(json, false);
}

export function DecodedRawMessageFromJSONTyped(json: any, ignoreDiscriminator: boolean): DecodedRawMessage {
    if (json == null) {
        return json;
    }
    return {
        
        'message': DecodedRawMessageMessageFromJSON(json['message']),
        'mode': json['mode'],
    };
}

  export function DecodedRawMessageToJSON(json: any): DecodedRawMessage {
      return DecodedRawMessageToJSONTyped(json, false);
  }

  export function DecodedRawMessageToJSONTyped(value?: DecodedRawMessage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': DecodedRawMessageMessageToJSON(value['message']),
        'mode': value['mode'],
    };
}

