import { removeMultipleForward } from './removeMultipleForward';

/**
 * It takes a path and a URL and returns a new URL that is the concatenation of the two
 * @param {string} path - string - the path to append to the url
 * @param {URL | string} url - URL | string
 * @returns A URL object.
 */
export const concatURL = (path: string, url: URL | string): URL => {
  const _url = url instanceof URL ? url : new URL(url);

  const joinedURL = removeMultipleForward(_url.href + path);

  return new URL(joinedURL, _url);
};
