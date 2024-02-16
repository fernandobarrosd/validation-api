import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/cpf", {
        schema: {
            operationId: "validateCPF",
            tags: ["Validation"],
            summary: "Validate CPF pattern",
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
                    description: "CPF pattern is valid",
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

        const isCPF = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(pattern);

        if (isCPF) {
            return reply.send({
                message: "CPF pattern is valid",
                pattern
            });
        }
        return reply.status(400).send({
            message: "CPF pattern is invalid",
            statusCode: 400
        });
    });
}