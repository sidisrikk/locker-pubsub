import { ApolloServer, gql } from 'apollo-server';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const TOPIC_LOCK_INFO = 'lockerInfo';

const typeDefs = gql`
  enum unitStatus {
    available
    reserved
  }
  type Query {
    test:  String
  }

  type Subscription {
    lockerInfo(lockerId: ID!):lockerType
  }

  type lockerType{
    locker_no: Int
    unit: [UnitType]
  }
  type UnitType{
      unit_no: Int
      passcode: String
      status: unitStatus
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    test: () => 'ok',
  },
  Subscription: {
    lockerInfo: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(TOPIC_LOCK_INFO),
        (payload, variables) => {
          if (payload.lockerInfo.locker_no === parseInt(variables.lockerId, 10)) {
            return true;
          }
          return false;
        },
      ),
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const genPasscode = () => {
  const tmp = new Array(6).fill(undefined);
  const arrChar = tmp.map(() => Math.floor(Math.random() * 10)).join('');
  return arrChar;
};

setInterval(() => {
  const no = Math.round(Math.random()) + 1;
  const code = genPasscode();
  console.log(`pub :${no} ${code}`);
  pubsub.publish(TOPIC_LOCK_INFO, {
    lockerInfo: {
      locker_no: no,
      unit: [
        {
          unit_no: 1,
          passcode: '',
          status: 'available',
        }, {
          unit_no: 2,
          passcode: code,
          status: 'reserved',
        },
      ],
    },
  });
}, 2000);
