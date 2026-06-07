import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { shouldBeUser } from "./middlewares/authMiddleware";
import productRouter from "./routes/product.route";
import categoryRouter from "./routes/category.route";
import { producer, consumer } from "./utils/kafka";

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3002", "http://localhost:3003"],
		credentials: true,
	}),
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
	res.status(200).json({
		status: "ok",
		uptime: process.uptime(),
		timestamp: Date.now(),
	});
});

app.get("/test", shouldBeUser, (req, res) => {
	res.json({ message: "Product service authenticated.", userId: req.userId });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// Replacing any use of try/catch method
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);

	return res
		.status(err.status || 500)
		.json({ message: err.message || "Internal server error." });
});

const start = async () => {
	try {
		Promise.all([await producer.connect(), await consumer.connect()]);

		app.listen(8000, () => {
			console.log("Product service is running on port 8000.");
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
