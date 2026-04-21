const { Kafka } = require("kafkajs");
const readline = require("readline");

const kafka = new Kafka({
  clientId: "cli-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const run = async () => {
  await producer.connect();

  console.log("Type a message (type 'exit' to quit):");

  rl.on("line", async (input) => {
    if (input.toLowerCase() === "exit") {
      await producer.disconnect();
      rl.close();
      process.exit(0);
    }

    await producer.send({
      topic: "test-topic",
      messages: [{ value: input }],
    });

    console.log("Sent to Kafka:", input);
  });
};

run();
