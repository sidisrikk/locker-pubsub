import { gql } from 'apollo-server';
import { Locker } from '../../models/connect';
import { pubgqlMsg } from '../subscription/lockerInfo';
import pubKafkaMsg from '../../kafka/producer';


const typeName = 'freeUnitMutation';
const typeDef = gql`
  type ${typeName}{
    ok: Boolean
  }
`;
const resolver = async (_, variables) => {
  const targetLocker = await Locker.find({ 'where': { 'no': variables.locker_no } });
  const targetAllUnit = await targetLocker.getUnits();
  // eslint-disable-next-line eqeqeq
  const targetUnit = targetAllUnit.find(i => i.no == variables.unit_no);


  console.log(`free Locker ${variables.locker_no} Unit ${variables.unit_no}`);
  // update db
  await targetUnit.update({ 'passcode': '', 'status': 'available' });

  // prep data to publish
  const units = targetAllUnit.map(i => ({
    'no': i.no,
    'passcode': (i.no === variables.unit_no) ? '' : i.passcode,
    'status': (i.no === variables.unit_no) ? 'available' : i.status,
  }));
  const msg = {
    'lockerInfo': {
      'no': variables.locker_no,
      'unit': units,
    },
  };
  // publish
  pubgqlMsg(msg);
  pubKafkaMsg(msg);


  return {
    'ok': true,
    'passcode': '',
  };
};

export {
  resolver as freeUnitMutationResolver,
  typeDef as freeUnitMutationTypeDef,
  typeName as freeUnitMutationTypeName,
};
