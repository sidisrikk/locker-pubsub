import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import { sequelize } from './models/connect';
import pubKafkaMsg from './kafka/producer';

const server = new ApolloServer({ typeDefs, resolvers });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

pubKafkaMsg({ 'ok': true });
