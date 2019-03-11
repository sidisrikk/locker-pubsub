import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import { sequelize } from './models/connect';

const server = new ApolloServer({ typeDefs, resolvers });

sequelize
  .authenticate()
  .then(() => {
    console.log('db connect rdy.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

server.listen().then(({ url }) => {
  console.log(`Apollo server ready at ${url}`);
});

// pubKafkaMsg({ 'ok': true });
