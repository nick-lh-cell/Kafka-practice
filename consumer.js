const { Kafka } = require("kafkajs");
const sqlite3 = require("sqlite3").verbose();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const db = new sqlite3.Database("data.db");

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  console.log("Listening...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value.toString();

      console.log("Whole message:", JSON.stringify(message));
      console.log("Received:", value);

      db.run("INSERT INTO messages (content) VALUES (?)", [value]);
    },
  });
};

run();
