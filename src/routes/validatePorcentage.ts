import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/porcentage", {
        schema: {
            operationId: "validatePorcentage",
            tags: ["Validation"],
            summary: "Validate porcentage pattern",
            body: {
                type: "object",
                properties: {
                    pattern: {
                        type: "string"
                    }
                }
            },
            response: {
                200: {
                    description: "Porcentage pattern is valid",
                    type: "object",
                    properties: {
                        message: {
                            type: "string"
                        },
                        pattern: {
                            type: "string"
                        }
                    }
                },
                400: {
                    description: "Response error",
                    type: "object",
                    properties: {
                        message: {
                            type: "string"
                        },
                        statusCode: {
                            type: "integer"
                        }
                    }
                }
            }
        }
    }, (request, reply) => {
        const validatePorcentageBody = z.object({
            pattern: z.string()
        });
        const result = validatePorcentageBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { pattern } } = result;

        const isPorcentage = /^[0-9]+(,[0-9]+)?[%]$/.test(pattern);

        if (isPorcentage) {
            return reply.send({
                message: "Porcentage pattern is valid",
                pattern
            });
        }
        return reply.status(400).send({
            message: "Porcentage pattern is invalid",
            statusCode: 400
        });
    });
}