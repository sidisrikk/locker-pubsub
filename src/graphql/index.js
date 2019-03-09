import { gql } from 'apollo-server';
import { testTypeDef, testResolver, testTypeName } from './query/test';
import { lockerTypeDef, lockerResolver, lockerTypeName } from './subscription/lockerInfo';
import { paymentMutationTypeDef, paymentMutationResolver, paymentMutationTypeName } from './mutation/reserveUnit';


const typeDefs = [
  gql`
    type Query {
      sample:  ${testTypeName}
    }
  `,
  testTypeDef,
  gql`
    type Mutation {
      reserveUnit(locker_no: Int!, unit_no: Int!, credit: Int!): ${paymentMutationTypeName}
    }
  `,
  paymentMutationTypeDef,
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
  'Mutation': {
    'reserveUnit': paymentMutationResolver,
  },
};

export {
  typeDefs,
  resolvers,
};
