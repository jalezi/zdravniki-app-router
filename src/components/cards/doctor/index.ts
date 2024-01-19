export { default as Accepts } from './Accepts';
export type { AcceptsProps } from './Accepts';

export { default as Availability } from './Availability';
export type { AvailabilityProps } from './Availability';

export { default as BasicInfo } from './BasicInfo';
export type { BasicInfoProps } from './BasicInfo';

export { default as Contacts } from './Contacts';
export type { ContactLinkProps as EmailProps } from './Contacts';

export { default as Name } from './Name';
export type { NameProps } from './Name';

import Accepts from './Accepts';
import Availability from './Availability';
import BasicInfo from './BasicInfo';
import Contacts from './Contacts';
import Name from './Name';

const Doctor = {
  Accepts,
  Availability,
  BasicInfo,
  Contacts,
  Name,
};

export default Doctor;
