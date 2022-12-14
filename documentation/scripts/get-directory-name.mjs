import PATH from 'path';

/**
 * @description
 * Return the name of the directory of the given path
 * @param {Readonly<string>} path The path to look into
 * @returns {string} The name of the last directory from the given path
 */
export function getDirectoryName(path) {
  return PATH.basename(PATH.resolve(path));
}
