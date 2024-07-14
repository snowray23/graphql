import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
}

startApolloServer().catch(error => {
  console.error('Error starting Apollo Server:', error);
});