import { gql } from 'apollo-server';
import { PubSub, withFilter } from 'graphql-subscriptions';
import genPasscode from '../../util/genPasscode';

const pubsub = new PubSub();
const TOPIC_LOCK_INFO = 'lockerInfo';

const typeName = 'locker';
const typeDef = gql`
  type ${typeName}{
    no: Int
    unit: [Unit]
  }

  enum unitStatus {
    available
    reserved
  }
  
  type Unit{
      unit_no: Int
      passcode: String
      status: unitStatus
  }
`;

const resolver = withFilter(
  () => pubsub.asyncIterator(TOPIC_LOCK_INFO),
  (payload, variables) => {
    if (payload.lockerInfo.locker_no === parseInt(variables.lockerId, 10)) {
      return true;
    }
    return false;
  },
);

export { resolver as lockerResolver, typeDef as lockerTypeDef, typeName as lockerTypeName };


// manual pu test
setInterval(() => {
  const no = Math.round(Math.random()) + 1;
  const code = genPasscode();
  console.log(`pub :${no} ${code}`);
  pubsub.publish(TOPIC_LOCK_INFO, {
    'lockerInfo': {
      no,
      'unit': [
        {
          'no': 1,
          'passcode': '',
          'status': 'available',
        }, {
          'no': 2,
          'passcode': code,
          'status': 'reserved',
        },
      ],
    },
  });
}, 2000);
