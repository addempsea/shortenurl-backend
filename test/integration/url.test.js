/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import { resolvers, typeDefs } from '../../app/graphql';
import urlResolvers from '../../app/graphql/resolvers/url';
import { url, shortenUrlQuery, invalidUrl } from '../fixtures/url';
import { constants } from '../../app/utils';
import app from '../..';

chai.use(chaiHttp);
const {
  httpStatusCodes: { OK, NOT_FOUND, BAD_REQUEST },
  URL_SHORTENED,
  FAIL,
  NOT_FOUND_API,
  BAD_URL_MESSAGE,
} = constants;

const runQuery = (query, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return graphql(schema, query, null, { ...ctx }, variables);
};

describe('Url tests', () => {
  describe('Shorten url', () => {
    it('should resolve correctly', () => {
      const result = urlResolvers.Query.shortenURL(null, { url });
      expect(result.status).to.eql(OK);
      expect(result.message).to.eql(URL_SHORTENED);
      expect(result.data.longUrl).to.eql(url);
    });

    it('It should query shortenUrlQuery correctly', async () => {
      const { data, errors } = await runQuery(shortenUrlQuery, { url });

      expect(errors).to.be.undefined;
      expect(data.shortenURL.status).to.eql(OK);
      expect(data.shortenURL.message).to.eql(URL_SHORTENED);
    });

    it('It should fail to query shortenUrlQuery correctly', async () => {
      const { errors } = await runQuery(shortenUrlQuery, { data: url });
      expect(errors).to.not.be.undefined;
    });

    it('It should query shortenUrlQuery correctly and fail with 400', async () => {
      const { data, errors } = await runQuery(shortenUrlQuery, { url: invalidUrl });

      expect(errors).to.be.undefined;
      expect(data.shortenURL.status).to.eql(BAD_REQUEST);
      expect(data.shortenURL.message).to.eql(BAD_URL_MESSAGE);
    });
  });

  describe('Redirect Url', () => {
    it('return 404 for unsaved url', async () => {
      const response = await chai.request(app).get('/yuyuylkkk');
      const { status } = response.body;
      expect(response).to.have.status(NOT_FOUND);
      expect(status).to.eql(FAIL);
      expect(response.body.message).to.eq(NOT_FOUND_API);
    });

    it('return 200 for redirected url', async () => {
      const response = await chai.request(app).get('/testing');
      expect(response).to.have.status(200);
      expect(response.redirects[0]).to.equal('https://www.womplyaccess.com/');
    });
  });
});
