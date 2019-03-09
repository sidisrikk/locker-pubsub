import { gql } from 'apollo-server';

const testTypeName = 'test';
const testTypeDef = gql`
  type ${testTypeName} {
    isOk: Boolean
    randomNumber: Float
  }
`;
const testResolver = () => ({ 'isOk': true, 'randomNumber': Math.random() });

export { testResolver, testTypeDef, testTypeName };
