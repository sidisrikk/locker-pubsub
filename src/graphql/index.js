import { gql } from 'apollo-server';
import { testTypeDef, testResolver, testTypeName } from './query/test';
import { lockerTypeDef, lockerResolver, lockerTypeName } from './subscription/lockerInfo';

const typeDefs = [
  gql`
    type Query {
      sample:  ${testTypeName}
    }
  `,
  testTypeDef,
  gql`
    type Subscription {
      sample: Float
      lockerInfo(lockerId: ID!):${lockerTypeName}
    }
  `,
  lockerTypeDef,
];

const resolvers = {
  'Query': {
    'sample': testResolver,
  },
  'Subscription': {
    'lockerInfo': {
      'subscribe': lockerResolver,
    },
  },
};

export {
  typeDefs,
  resolvers,
};
