import { FastifyInstance } from "fastify";
import z from "zod";

export default async function(app: FastifyInstance) {
    app.post("/porcentage", (request, reply) => {
        const validatePorcentageBody = z.object({
            porcentage: z.string()
        });
        const result = validatePorcentageBody.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: result.error.message,
                statusCode: 400
            });
        }
        const { data: { porcentage } } = result;

        const isPorcentage = /^[0-9]+(,[0-9]+)?[%]$/.test(porcentage);

        if (isPorcentage) {
            return reply.send({
                message: "Porcentage pattern is valid",
                porcentage
            });
        }
        return reply.status(400).send({
            message: "Porcentage pattern is invalid",
            porcentage,
            statusCode: 400
        });
    });
}