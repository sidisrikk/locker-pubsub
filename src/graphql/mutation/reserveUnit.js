import { gql } from 'apollo-server';
import genPasscode from '../../util/genPasscode';
import { Locker } from '../../models/connect';
import { pubgqlMsg } from '../subscription/lockerInfo';
import pubKafkaMsg from '../../kafka/producer';


const typeName = 'paymentMutation';
const typeDef = gql`
  type ${typeName}{
    ok: Boolean
    msg: String
    passcode: String
  }
`;
const resolver = async (_, variables) => {
  const targetLocker = await Locker.find({ 'where': { 'no': variables.locker_no } });
  const targetAllUnit = await targetLocker.getUnits();
  // eslint-disable-next-line eqeqeq
  const targetUnit = targetAllUnit.find(i => i.no == variables.unit_no);

  // check available
  if (targetUnit.status === 'reserved') {
    return {
      'ok': false,
      'msg': 'Unit\'s reserved',
    };
  }

  const code = genPasscode();
  console.log(`new passcode : ${code} to Locker ${variables.locker_no} Unit ${variables.unit_no}`);
  // update db
  await targetUnit.update({ 'passcode': code, 'status': 'reserved' });

  // prep data to publish
  const units = targetAllUnit.map(i => ({
    'no': i.no,
    'passcode': (i.no === variables.unit_no) ? code : i.passcode,
    'status': (i.no === variables.unit_no) ? 'reserved' : i.status,
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
    'passcode': code,
  };
};

export {
  resolver as paymentMutationResolver,
  typeDef as paymentMutationTypeDef,
  typeName as paymentMutationTypeName,
};
