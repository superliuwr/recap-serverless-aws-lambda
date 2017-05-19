'use strict';

require('dotenv').config({
  // 'Offline' use needs a custom env file, other cases will be generated during deploy
  path: process.env.DOT_ENV_PATH || '.env',
});

const config = require('./lib/config/config');
const logger = require('./lib/logger').createLogger();
const profileService = require('./lib/profileService');

function onSuccess(cb) {
  return (data) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(data),
    };

    cb(null, response);
  };
}

function onFailure(event, cb) {
  return (error) => {
    logger.error(`Processing error: ${error.type} ${error.message} [${JSON.stringify(error)}], 
    related event [${JSON.stringify(event)}]`);

    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
        'Content-Type': 'text/plain'
      }
    };

    // All user related errors are caught and set type to 'user'
    if (error.type === 'user') {
      response.statusCode = 400;
      response.body = error.message || 'Bad Request';
    } else {
      response.statusCode = 500;
      response.body = error.message || 'Internal Server Error';
    }

    cb(null, response);
  };
}

function checkStageVariables() {
  return new Promise((resolve, reject) => {
    const stageVariables = {
      environment: process.env.ENVIRONMENT,
      serviceName: process.env.SERVERLESS_SERVICE_NAME,
      stage: process.env.SERVERLESS_STAGE,
      s3Bucket: process.env.S3_BUCKET_NAME,
    };

    if (!stageVariables
      || !stageVariables.environment
      || !stageVariables.serviceName
      || !stageVariables.stage) {
      return reject('Stage variables missing from process environment');
    }
    return resolve(stageVariables);
  });
}

/**
 * Helper function which extracts the stageVariables for later use.
 *
 * @private
 * @param method callback method which will be passed the stageVariables, event, and lambda cb.
 */
const withStageVariables = method =>
  (event, context, cb) =>
    checkStageVariables()
      .then(sv => method(sv, event, cb))
      .catch(onFailure(cb));

function createUserError(msg, error) {
  const userError = new Error(msg);
  userError.type = 'user';

  logger.error(`User error caught [${msg}], related error [${JSON.stringify(error)}]`);

  return userError;
}

function extractUserProfileRequestParams(event) {
  return new Promise((resolve, reject) => {
    if (!event.queryStringParameters) {
      return reject(createUserError('Request queryStringParameters is missing'));
    }

    const queryStringParameters = event.queryStringParameters;

    if (!queryStringParameters.uid) {
      return reject(createUserError('UID is missing'));
    }

    return resolve({
      uid: queryStringParameters.uid
    });
  });
}

/**
 * Lambda Handler for fetching an User Profile.
 */
const fetchUserProfile = withStageVariables((stageVariables, event, cb) => {
  const applicationConfig = config.getApplicationConfiguration(stageVariables.environment);

  extractUserProfileRequestParams(event)
    .then(params => profileService.getUserProfile(applicationConfig, params.uid))
    .then(onSuccess(cb))
    .catch(onFailure(event, cb));
});

module.exports = {
  fetchUserProfile
};
