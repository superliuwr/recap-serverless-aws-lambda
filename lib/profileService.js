/**
 * To return user profile for a given user.
 *
 * @param {object} config application configuration object.
 * @param {string} uid user ID.
 */
function getUserProfile(config, uid) {
  return config.profile;
}

module.exports = {
  getUserProfile
};
