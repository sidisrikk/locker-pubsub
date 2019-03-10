import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ 'kafkaHost': 'localhost:9092' });
const TOPIC = 'locker-info';
const producer = new kafka.Producer(client);


const pubMsg = producer.on('ready', () => {
//   producer.send(payloads, (err, data) => {
//     console.log(data);
//   });
  console.log('producer rdy');
});

producer.on('error', (err) => { console.log(err); });

const pubKafkaMsg = (obj) => {
  // sample msg
  const payloads = [
    { 'topic': TOPIC, 'messages': JSON.stringify(obj) },
  ];
  producer.send(payloads, (err, data) => {
    console.log(data);
  });
};

export default pubKafkaMsg;


// const topicsToCreate = [{
//   'topic': TOPIC,
//   'partitions': 1,
//   'replicationFactor': 1,
// }];

// client.createTopics(topicsToCreate, (err, result) => {
// result is an array of any errors if a given topic could not be created
//   if (err) console.log(err);
// });
