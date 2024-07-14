import fetch from 'node-fetch';

const resolvers = {
  Query: {
    posts: () => {
      return fetch('https://graphqlzero.almansi.me/api/posts')
        .then(response => response.json())
        .then(data => data.data.posts);
    },
    post: (_, { id }: { id: string }) => {
      return fetch(`https://graphqlzero.almansi.me/api/post/${id}`)
        .then(response => response.json())
        .then(data => data.data.post);
    },
  },
};

export default resolvers;