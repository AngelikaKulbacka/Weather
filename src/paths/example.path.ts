import { concatURL } from '@utils/concatURL';
import { basePath } from './base.path';

export const examplePath = {
  example: concatURL('/example', basePath.api),
};
