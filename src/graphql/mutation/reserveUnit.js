import { gql } from 'apollo-server';

const typeName = 'paymentMutation';
const typeDef = gql`
  type ${typeName}{
    ok: Boolean
    passcode: String
  }
`;

const resolver = () => ({
  'ok': true,
  'passcode': '45678',
});

export {
  resolver as paymentMutationResolver,
  typeDef as paymentMutationTypeDef,
  typeName as paymentMutationTypeName,
};
