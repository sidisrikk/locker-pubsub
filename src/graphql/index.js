import { gql } from 'apollo-server';
import { testTypeDef, testResolver, testTypeName } from './query/test';
import { lockerTypeDef, lockerResolver, lockerTypeName } from './subscription/lockerInfo';
import { paymentMutationTypeDef, paymentMutationResolver, paymentMutationTypeName } from './mutation/reserveUnit';

import {
  freeUnitMutationResolver,
  freeUnitMutationTypeDef,
  freeUnitMutationTypeName,
} from './mutation/freeUnit';

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
      freeUnit(locker_no: Int!, unit_no: Int!): ${freeUnitMutationTypeName}
    }
  `,
  paymentMutationTypeDef,
  freeUnitMutationTypeDef,
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
    'freeUnit': freeUnitMutationResolver,
  },
};

export {
  typeDefs,
  resolvers,
};
