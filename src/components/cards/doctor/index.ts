export { default as BasicInfo } from './BasicInfo';
export type { BasicInfoProps } from './BasicInfo';

export { default as Name } from './Name';
export type { NameProps } from './Name';

export { default as Availability } from './Availability';
export type { AvailabilityProps } from './Availability';

import Availability from './Availability';
import BasicInfo from './BasicInfo';
import Name from './Name';

const Doctor = {
  BasicInfo,
  Name,
  Availability,
};

export default Doctor;
