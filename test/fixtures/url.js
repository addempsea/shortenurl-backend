import faker from 'faker';

export const shortenUrlQuery = `
  query ShortenUrl($url: String!) {
    shortenURL(url: $url) {
      status,
      message,
      data {
        longUrl,
        shortUrl
      }
    }
  }
`;

export const url = faker.internet.url();
export const invalidUrl = faker.random.word();
