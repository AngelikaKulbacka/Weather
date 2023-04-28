import { concatURL } from '@utils/concatURL';
import { basePath } from './base.path';

export const ApiPath = {
  geo: concatURL('/geo/1.0/', basePath.api),
  get direct() {
    return concatURL('/direct', this.geo);
  },
  get zip() {
    return concatURL('/zip', this.geo);
  },
  get reverse() {
    return concatURL('/reverse', this.geo);
  },
  weather: concatURL('/data/2.5/weather', basePath.api),
  airPollution: concatURL('data/2.5/air_pollution', basePath.api),
};

export default ApiPath;
