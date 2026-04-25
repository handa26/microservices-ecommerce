import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

import type { CustomJwtSessionClaims } from "@repo/types";

declare module "fastify" {
	interface FastifyRequest {
		userid?: string;
		auth: {
			userId?: string;
		}
	}
}

export const shouldBeUser = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const auth = getAuth(request);

	if (!auth.userId) {
		return reply.status(401).send({ message: "You are not logged in!" });
	}

	const claims = auth.sessionClaims as CustomJwtSessionClaims;

	if (claims?.metadata?.role !== "user") {
		return reply.status(403).send({ message: "Unauthorized!" });
	}
};

export const shouldBeAdmin = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const auth = getAuth(request);

	if (!auth.userId) {
		return reply.status(401).send({ message: "You are not logged in!" });
	}

	const claims = auth.sessionClaims as CustomJwtSessionClaims;

	if (claims?.metadata?.role !== "admin") {
		return reply.status(403).send({ message: "Unauthorized!" });
	}
};
