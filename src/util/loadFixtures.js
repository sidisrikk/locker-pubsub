import { Unit, Locker } from '../models/connect';
import lockerData from '../models/fixture/locker.json';
import unitData from '../models/fixture/unit.json';

const loadfixture = async () => {
  const locker1 = await Locker.create(lockerData);
  unitData.forEach(async (i) => {
    await Unit.create(i);
  });

  // link foreign key for practical purpose
  // or just defind in fixtures
  const tmp = await Unit.findAll();
  await locker1.setUnits(tmp);
};

loadfixture();
