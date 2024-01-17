export { default as Accepts } from './Accepts';
export type { AcceptsProps } from './Accepts';

export { default as Availability } from './Availability';
export type { AvailabilityProps } from './Availability';

export { default as BasicInfo } from './BasicInfo';
export type { BasicInfoProps } from './BasicInfo';

export { default as Name } from './Name';
export type { NameProps } from './Name';

import Accepts from './Accepts';
import Availability from './Availability';
import BasicInfo from './BasicInfo';
import Name from './Name';

const Doctor = {
  Accepts,
  Availability,
  BasicInfo,
  Name,
};

export default Doctor;
