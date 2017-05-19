/**
 * Module to load config.json configuration file.
 */
const fs = require('fs');
const _ = require('lodash');

const FILE_ENCODING = 'utf8';
const CONFIG_FILE_PATH = 'config.json';
const DEFAULT_CONFIG = 'default';

/**
 * Returns the configuration for the specified env.
 *
 * @param env
 */
function getApplicationConfiguration(env) {
  const data = fs.readFileSync(CONFIG_FILE_PATH, { encoding: FILE_ENCODING });
  const config = JSON.parse(data);
  return _.merge({}, config[DEFAULT_CONFIG], config[env]);
}

module.exports = {
  getApplicationConfiguration,
};
