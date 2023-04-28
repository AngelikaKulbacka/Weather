import URLDictionary from '@dictionary/URLDictionary';

/**
 * This function removes multiple forward slashes from a string.
 * @param {string} path - string - the path that you want to remove the multiple forward slashes
 * @returns The path with the multiple forward slashes removed.
 */
export const removeMultipleForward = (path: string) => {
  return path.replace(URLDictionary.multipleForward, '$1');
};
