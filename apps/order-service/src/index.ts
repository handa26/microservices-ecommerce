import Fastify from "fastify";
import Clerk from "@clerk/fastify";

import { shouldBeUser } from "./middlewares/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.route.js";

const fastify = Fastify();

fastify.register(Clerk.clerkPlugin);

fastify.get("/health", (request, reply) => {
	return reply.status(200).send({
		status: "ok",
		uptime: process.uptime(),
		timestamp: Date.now(),
	});
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
	return reply.send({
		message: "Order service is authenticated.",
		userId: request.userId,
	});
});

fastify.register(orderRoute);

const start = async () => {
	try {
		await connectOrderDB();

		await fastify.listen({ port: 8001 });
		console.log("Order service is running on port 8001.");
	} catch (error) {
		console.log(error);
		fastify.log.error(error);
		process.exit(1);
	}
};

start();
