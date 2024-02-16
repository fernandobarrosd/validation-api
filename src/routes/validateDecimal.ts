import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/decimal", {
        schema: {
            operationId: "validateDecimalNumber",
            tags: ["Validation"],
            summary: "Validate Decimal number pattern",
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
                    description: "Decimal number pattern is valid",
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

        const isDecimalNumber = /^[0-9]+,[0-9]+$/.test(pattern);

        if (isDecimalNumber) {
            return reply.send({
                message: "Decimal pattern is valid",
                pattern
            });
        }
        return reply.status(400).send({
            message: "Decimal pattern is invalid",
            statusCode: 400
        });
    });
}