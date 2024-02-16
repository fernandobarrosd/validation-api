import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/cep", {
        schema: {
            operationId: "validateCEP",
            tags: ["Validation"],
            summary: "Validate CEP pattern",
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
                    description: "CEP pattern is valid",
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
        const validateCEPBody = z.object({
            pattern: z.string()
        });
        const result = validateCEPBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { pattern } } = result;

        const isCEP = /^[0-9]{5}-[0-9]{3}$/.test(pattern);

        if (isCEP) {
            return reply.send({
                message: "CEP pattern is valid",
                pattern
            });
        }
        return reply.status(400).send({
            message: "CEP pattern is invalid",
            statusCode: 400
        });
    });
}