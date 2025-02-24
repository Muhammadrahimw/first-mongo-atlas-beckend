import redis from "redis";

const redisClient = redis.createClient({
	url: process.env.REDIS_URL,
	password: process.env.REDIS_TOKEN,
});

const connectRedis = async () => {
	if (!redisClient.isOpen) await redisClient.connect();
	console.log(`redis connected`);
};

connectRedis().catch((err) => console.error("Redis connection error:", err));

export default redisClient;
