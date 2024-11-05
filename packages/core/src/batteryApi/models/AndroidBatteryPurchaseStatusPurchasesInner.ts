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
import type { AndroidBatteryPurchaseStatusPurchasesInnerError } from './AndroidBatteryPurchaseStatusPurchasesInnerError';
import {
    AndroidBatteryPurchaseStatusPurchasesInnerErrorFromJSON,
    AndroidBatteryPurchaseStatusPurchasesInnerErrorFromJSONTyped,
    AndroidBatteryPurchaseStatusPurchasesInnerErrorToJSON,
    AndroidBatteryPurchaseStatusPurchasesInnerErrorToJSONTyped,
} from './AndroidBatteryPurchaseStatusPurchasesInnerError';

/**
 * 
 * @export
 * @interface AndroidBatteryPurchaseStatusPurchasesInner
 */
export interface AndroidBatteryPurchaseStatusPurchasesInner {
    /**
     * 
     * @type {string}
     * @memberof AndroidBatteryPurchaseStatusPurchasesInner
     */
    productId: string;
    /**
     * 
     * @type {string}
     * @memberof AndroidBatteryPurchaseStatusPurchasesInner
     */
    token: string;
    /**
     * 
     * @type {boolean}
     * @memberof AndroidBatteryPurchaseStatusPurchasesInner
     */
    success: boolean;
    /**
     * 
     * @type {AndroidBatteryPurchaseStatusPurchasesInnerError}
     * @memberof AndroidBatteryPurchaseStatusPurchasesInner
     */
    error?: AndroidBatteryPurchaseStatusPurchasesInnerError;
}

/**
 * Check if a given object implements the AndroidBatteryPurchaseStatusPurchasesInner interface.
 */
export function instanceOfAndroidBatteryPurchaseStatusPurchasesInner(value: object): value is AndroidBatteryPurchaseStatusPurchasesInner {
    if (!('productId' in value) || value['productId'] === undefined) return false;
    if (!('token' in value) || value['token'] === undefined) return false;
    if (!('success' in value) || value['success'] === undefined) return false;
    return true;
}

export function AndroidBatteryPurchaseStatusPurchasesInnerFromJSON(json: any): AndroidBatteryPurchaseStatusPurchasesInner {
    return AndroidBatteryPurchaseStatusPurchasesInnerFromJSONTyped(json, false);
}

export function AndroidBatteryPurchaseStatusPurchasesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): AndroidBatteryPurchaseStatusPurchasesInner {
    if (json == null) {
        return json;
    }
    return {
        
        'productId': json['product_id'],
        'token': json['token'],
        'success': json['success'],
        'error': json['error'] == null ? undefined : AndroidBatteryPurchaseStatusPurchasesInnerErrorFromJSON(json['error']),
    };
}

  export function AndroidBatteryPurchaseStatusPurchasesInnerToJSON(json: any): AndroidBatteryPurchaseStatusPurchasesInner {
      return AndroidBatteryPurchaseStatusPurchasesInnerToJSONTyped(json, false);
  }

  export function AndroidBatteryPurchaseStatusPurchasesInnerToJSONTyped(value?: AndroidBatteryPurchaseStatusPurchasesInner | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'product_id': value['productId'],
        'token': value['token'],
        'success': value['success'],
        'error': AndroidBatteryPurchaseStatusPurchasesInnerErrorToJSON(value['error']),
    };
}
