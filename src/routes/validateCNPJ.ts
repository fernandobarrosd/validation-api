import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/cnpj", {
        schema: {
            operationId: "validateCNPJ",
            tags: ["Validation"],
            summary: "Validate CNPJ",
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
                    description: "CNPJ is valid",
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
        const validateCNPJBody = z.object({
            pattern: z.string()
        });
        const result = validateCNPJBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { pattern } } = result;

        const isCNPJ = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}[/][0-9]{4}-[0-9]{2}$/.test(pattern);

        if (isCNPJ) {
            return reply.send({
                message: "CNPJ pattern is valid",
                pattern
            });
        }
        return reply.status(400).send({
            message: "CNPJ pattern is invalid",
            statusCode: 400
        });
    });
}