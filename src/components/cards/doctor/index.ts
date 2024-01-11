export { default as BasicInfo } from './BasicInfo';
export type { BasicInfoProps } from './BasicInfo';

export { default as Name } from './Name';
export type { NameProps } from './Name';

import BasicInfo from './BasicInfo';
import Name from './Name';

const Doctor = {
  BasicInfo,
  Name,
};

export default Doctor;
