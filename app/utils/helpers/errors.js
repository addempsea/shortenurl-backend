import constants from '../constants';

const { INTERNAL_SERVER_ERROR_MSG, NOT_FOUND_API, httpStatusCodes: {
  NOT_FOUND, INTERNAL_SERVER_ERROR
} } = constants;

export default {
  serverError: { message: INTERNAL_SERVER_ERROR_MSG, status: INTERNAL_SERVER_ERROR, name: 'ApiError' },
  notFoundApi: { message: NOT_FOUND_API, status: NOT_FOUND, name: 'ApiError' }
};
