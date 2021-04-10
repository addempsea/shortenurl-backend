import config from '../../../config/env';

const {
  BACKDROP_BASE_URL,
  NODE_ENV,
  PORT
} = config;

const BASE_URL = NODE_ENV === 'production'
  ? BACKDROP_BASE_URL
  : `http://localhost:${PORT || 3000}`;

export default {
  REDIS_RUNNING: 'Redis server is running',
  BACKDROP_RUNNING: 'BACKDROP is running on PORT',
  v1: '/api/v1',
  BASE_URL,
  NOT_FOUND_API: 'Oops, You have reached a dead end',
  SUCCESS: 'success',
  SUCCESS_RESPONSE: 'Request was successfully processed',
  FAIL: 'fail',
  WELCOME: 'Thanks for dropping by, you are at Backdrop',
  INTERNAL_SERVER_ERROR_MSG: 'Oops, something broke on the server!!!',
  URL_SHORTENED: 'Url shortened successfully',
  URL_SHORTEN_ERROR: 'Error while shortening url',
  URL_SHORTEN_FAIL: 'URL_SHORTEN_FAIL',
  BAD_URL_MESSAGE: 'Kindly provide a valid url',
  ERROR_REDIRECTING: 'Error while redirecting',
  ERROR_REDIRECTING_FAIL: 'ERROR_REDIRECTING_FAIL'
};
