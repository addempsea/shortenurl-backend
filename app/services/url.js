import randomize from 'randomatic';
import urlModel from '../model';
import { constants } from '../utils';

/**
 * Contains a collection of service methods for managing Url resource on the app.
 * @class UrlService
 *
 */
export default class UrlService {
  /**
   * Fetches a Url by shortUrl
   * @memberof UrlService
   * @param {string} shortUrl - shortened url
   * @returns { object | Error> } A promise that resolves or rejects
   * with an Array of the Url resource or a DB Error.
   */
  static getLongUrl(shortUrl) {
    return urlModel.find((el) => el.shortUrl === shortUrl.toLowerCase());
  }

  /**
   * It generates a unique url.
   * @static
   * @private
   * @memberof UrlService
   * @returns {String} - A unique string.
   */
  static generateUniqueUrl() {
    const url = randomize('a', 6);
    if (!UrlService.getLongUrl(url) && url.length === 6) {
      return url;
    }
    UrlService.generateUniqueUrl();
  }

  /**
   * shorten url and save it
   * @memberof UrlService
   * @param {string} longUrl - long url to be shortened
   * @returns { object | Error> } A promise that resolves or rejects
   * with an Array of the Url resource or a DB Error.
   */
  static shortenUrl(longUrl) {
    const shortUrl = UrlService.generateUniqueUrl();
    const urlInfo = { shortUrl, longUrl };
    urlModel.push(urlInfo);
    return { ...urlInfo, shortUrl: `${constants.BASE_URL}/${shortUrl}` };
  }
}
