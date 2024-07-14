import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      body
      userId
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      userId
    }
  }
`;