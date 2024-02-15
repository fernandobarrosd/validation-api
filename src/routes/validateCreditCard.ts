import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/creditCard", (request, reply) => {
        const validateCPFBody = z.object({
            creditCard: z.string()
        });
        const result = validateCPFBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { creditCard } } = result;

        const isCreditCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(creditCard);

        if (isCreditCard) {
            return reply.send({
                message: "Credit card pattern is valid",
                creditCard
            });
        }
        return reply.status(400).send({
            message: "Credit card pattern is invalid",
            creditCard,
            statusCode: 400
        });
    });
}