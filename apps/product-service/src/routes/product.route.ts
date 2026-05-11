import { Router } from "express";

import { shouldBeUser } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.get("/test", (req, res) => {
	res.json({ message: "product route works!" });
});

export default Router;
