const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();

  for (let i = 0; i < 3; i++) {
    const message = `Hello Kafka ${i}`;

    await producer.send({
      topic: "test-topic",
      messages: [{ value: message }],
    });

    console.log("Sent:", message);
  }

  await producer.disconnect();
};

run();
