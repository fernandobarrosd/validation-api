import "dotenv/config";
import fastifyAutoload from "@fastify/autoload";
import fastify from "fastify";
import { join } from "node:path";

const PORT = process.env.PORT || 3000;
const app = fastify();


app.register(fastifyAutoload, {
    dir: join(__dirname, "routes")
});


app.listen({ port: PORT !== 3000 ? parseInt(PORT) : PORT }).then(() => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});