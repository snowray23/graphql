import { gql } from '@apollo/client';

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }
`;

export default typeDefs;