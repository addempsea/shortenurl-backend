import validUrl from 'valid-url';
import UrlService from '../../services';
import { helpers, constants, ApiError } from '../../utils';

const {
  ResponseHelper: { moduleErrLogMessager, graphQLResponse }
} = helpers;

const {
  httpStatusCodes: { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST },
  URL_SHORTENED,
  URL_SHORTEN_ERROR,
  URL_SHORTEN_FAIL,
  BAD_URL_MESSAGE
} = constants;

const urlResolvers = {
  Query: {
    shortenURL(_, { url }) {
      try {
        if (validUrl.isUri(url)) {
          const data = UrlService.shortenUrl(url);
          return graphQLResponse(OK, URL_SHORTENED, data);
        }
        return graphQLResponse(BAD_REQUEST, BAD_URL_MESSAGE);
      } catch (err) {
        const error = new ApiError({
          status: URL_SHORTEN_FAIL,
          message: err.message
        });
        moduleErrLogMessager(error);
        return graphQLResponse(INTERNAL_SERVER_ERROR, URL_SHORTEN_ERROR);
      }
    }
  }
};

export default urlResolvers;
