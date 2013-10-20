/**
 * Parse the `modified` input strings to represent the filesystem path
 *
 * Replaces dashes with /
 * Replaces $dot$ with .
 *
 * @param {String} target target replace
 * @return {String} replaced value
 */
exports.parse = function(target) {
  return (target || '').replace(/\-/g, '/')
                       .replace(/\$dot\$/g, '.');
};
