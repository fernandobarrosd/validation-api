import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/decimal", (request, reply) => {
        const validateCEPBody = z.object({
            number: z.string()
        });
        const result = validateCEPBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { number } } = result;

        const isDecimalNumber = /^[0-9]+,[0-9]+$/.test(number);

        if (isDecimalNumber) {
            return reply.send({
                message: "Decimal number is valid",
                number
            });
        }
        return reply.status(400).send({
            message: "Decimal number is invalid",
            number,
            statusCode: 400
        });
    });
}