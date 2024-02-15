import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/cep", (request, reply) => {
        const validateCEPBody = z.object({
            cep: z.string()
        });
        const result = validateCEPBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { cep } } = result;

        const isCEP = /^[0-9]{5}-[0-9]{3}$/.test(cep);

        if (isCEP) {
            return reply.send({
                message: "CEP pattern is valid",
                cep
            });
        }
        return reply.status(400).send({
            message: "CEP pattern is invalid",
            cep,
            statusCode: 400
        });
    });
}