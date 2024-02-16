import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/creditCard", {
        schema: {
            operationId: "validateCreditCard",
            tags: ["Validation"],
            summary: "Validate Credit Card number pattern",
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
                    description: "Credit Card number pattern is valid",
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
        const validateCPFBody = z.object({
            pattern: z.string()
        });
        const result = validateCPFBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { pattern } } = result;

        const isCreditCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(pattern);

        if (isCreditCard) {
            return reply.send({
                message: "Credit card pattern is valid",
                pattern
            });
        }
        return reply.status(400).send({
            message: "Credit card pattern is invalid",
            statusCode: 400
        });
    });
}