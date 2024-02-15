import { FastifyInstance } from "fastify";

export default async function(app: FastifyInstance) {
    app.get("/", () => {
        return {
            message: "Server is running",
            statusCode: 200
        };
    });
}