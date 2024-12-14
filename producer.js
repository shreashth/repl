const { Kafka } = require('kafkajs');
const kafkaConfig = require('./config').kafkaConfig;

const { broker, clientId } = kafkaConfig;
console.log(broker,clientId)
const brokers = [`${broker}`];

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({
  clientId,
  brokers,
});
const producer = kafka.producer({
  allowAutoTopicCreation: true,
});

const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    // console.log(
    //   '-------------- Kafka Producer Connected ----------------------'
    // );
  } catch (error) {
    throw error;
  }
};

connectKafkaProducer();
const messageProducer = async ({ data, topic }) => {
  try {

    await producer.send({ topic, messages: [{ value: JSON.stringify(data) }] });
    console.log(`Message produced: ${JSON.stringify(data)}`);
    return true;
  } catch (error) {
    console.log(error);
    console.log(`Error in produceMessage: ${JSON.stringify(error)}`);
    return false;
  }
};

// const messageProducer = async ({ data, topic }) => {
//   console.log(topic);
//   return true;
// };

module.exports = { messageProducer };
