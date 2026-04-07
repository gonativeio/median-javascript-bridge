import { SalesforceCloud } from '../types/salesforceCloud.js';
import { addCommandCallback } from '../utils/index.js';

export const salesforceCloud = {
  promptNotification: function () {
    return addCommandCallback<SalesforceCloud.PermissionResponse>('median://salesforceCloud/promptNotification');
  },
  notificationEnabled: function () {
    return addCommandCallback<SalesforceCloud.PermissionResponse>('median://salesforceCloud/notificationEnabled');
  },
  getInfo: function () {
    return addCommandCallback<SalesforceCloud.GetInfoResponse>('median://salesforceCloud/getInfo');
  },
  contactKey: {
    set: function (params: SalesforceCloud.SetContactKeyParams) {
      return addCommandCallback<SalesforceCloud.SetContactKeyResponse>(
        'median://salesforceCloud/contactKey/set',
        params
      );
    },
    get: function () {
      return addCommandCallback<SalesforceCloud.GetContactKeyResponse>('median://salesforceCloud/contactKey/get');
    },
  },
  attributes: {
    set: function (params: SalesforceCloud.SetAttributesParams) {
      return addCommandCallback<SalesforceCloud.SetAttributesResponse>(
        'median://salesforceCloud/attributes/set',
        params
      );
    },
    get: function () {
      return addCommandCallback<SalesforceCloud.GetAttributesResponse>('median://salesforceCloud/attributes/get');
    },
  },
  tags: {
    set: function (params: SalesforceCloud.SetTagsParams) {
      return addCommandCallback<SalesforceCloud.SetTagsResponse>('median://salesforceCloud/tags/set', params);
    },
    get: function () {
      return addCommandCallback<SalesforceCloud.GetTagsResponse>('median://salesforceCloud/tags/get');
    },
  },
};

export default salesforceCloud;
