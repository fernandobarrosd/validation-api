import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/cpf", (request, reply) => {
        const validateCPFBody = z.object({
            cpf: z.string()
        });
        const result = validateCPFBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { cpf } } = result;

        const isCPF = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(cpf);

        if (isCPF) {
            return reply.send({
                message: "CPF is valid",
                cpf
            });
        }
        return reply.status(400).send({
            message: "CPF is invalid",
            cpf,
            statusCode: 400
        });
    });
}