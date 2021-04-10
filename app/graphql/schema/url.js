import { gql } from 'apollo-server-express';

const Url = gql`
  # DATA TYPES

  type Url {
    longUrl: String!
    shortUrl: String!
  }

  # RESPONSE TYPES

  type UrlResponse {
    status: Int!
    message: String!
    data: Url
  }
  
  # MUTATION
  
  extend type Query {
    shortenURL(url: String!): UrlResponse!
  }
`;

export default Url;
