import { helpers, ApiError, constants } from '../utils';
import UrlService from '../services';

const {
  ResponseHelper: { moduleErrLogMessager, errorResponse },
  errorHelper: { notFoundApi }
} = helpers;
const { ERROR_REDIRECTING_FAIL, ERROR_REDIRECTING } = constants;

/**
 * A collection of methods that controls and issues the final response during get request processes.
 * @class RedirectController
 */
export default class RedirectController {
  /**
   * Controllers used for redirecting basic Redirect
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the Redirect added
   * @memberof RedirectController
   */
  static redirect(req, res, next) {
    try {
      const { shortUrl } = req.params;
      const { longUrl } = UrlService.getLongUrl(shortUrl) || {};
      return longUrl ? res.redirect(longUrl) : errorResponse(req, res, notFoundApi);
    } catch (e) {
      const error = new ApiError({
        status: ERROR_REDIRECTING_FAIL,
        message: e.message
      });
      moduleErrLogMessager(error);
      next(new ApiError({ message: ERROR_REDIRECTING }));
    }
  }
}
