import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/cnpj", (request, reply) => {
        const validateCNPJBody = z.object({
            cnpj: z.string()
        });
        const result = validateCNPJBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { cnpj } } = result;

        const isCNPJ = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}[/][0-9]{4}-[0-9]{2}$/.test(cnpj);

        if (isCNPJ) {
            return reply.send({
                message: "CNPJ is valid",
                cnpj
            });
        }
        return reply.status(400).send({
            message: "CNPJ is invalid",
            cnpj,
            statusCode: 400
        });
    });
}