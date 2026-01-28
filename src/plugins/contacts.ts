import { CallbackData, CallbackParams } from '../types/index.js';
import { addCommandCallback } from '../utils.js';

type ContactItem = {
  birthday?: string;
  namePrefix?: string;
  givenName?: string;
  middleName?: string;
  familyName?: string;
  previousFamilyName?: string;
  nameSuffix?: string;
  nickname?: string;
  phoneticGivenName?: string;
  phoneticMiddleName?: string;
  phoneticFamilyName?: string;
  organizationName?: string;
  departmentName?: string;
  jobTitle?: string;
  note?: string;
  phoneNumbers?: { label: string; phoneNumber: string }[];
  emailAddresses?: { label: string; emailAddress: string }[];
  postalAddresses?: {
    label: string;
    street: string;
    city: string;
    state: string;
    region: string;
    postalCode: string;
    country: string;
    isoCountryCode: string;
    subAdministrativeArea: string;
    subLocality: string;
  }[];
  companyName?: string;
  companyTitle?: string;
};

type ContactsGetData = CallbackData & {
  contacts?: ContactItem[];
};

type ContactsPermissionData = { status: 'granted' | 'denied' | 'restricted' | 'notDetermined' };

type ContactsPickData = CallbackData & {
  contact?: ContactItem;
  contacts?: ContactItem[];
};

const contacts = {
  getAll: function (params: CallbackParams<ContactsGetData>) {
    return addCommandCallback<ContactsGetData>('median://contacts/getAll', params);
  },
  getPermissionStatus: function (params: CallbackParams<ContactsPermissionData>) {
    return addCommandCallback<ContactsPermissionData>('median://contacts/getPermissionStatus', params);
  },
  pickContact: function (params: CallbackParams<ContactsPickData> & { multiple?: boolean }) {
    return addCommandCallback<ContactsPickData>('median://contacts/pickContact', params);
  },
};

export default contacts;
