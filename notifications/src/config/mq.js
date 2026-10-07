import amqplib from "amqplib";

const QUEUE = "auth_notification_queue";

const connection = await amqplib.connect(process.env.RABBITMQ_URL);

const channel = await connection.createChannel();

channel.assertQueue(QUEUE, { durable: true }); // Channel ke andar queue insert krna, we can add multiple queue

export default channel;
