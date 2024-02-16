import "dotenv/config";
import fastifyAutoload from "@fastify/autoload";
import fastify from "fastify";
import { join, resolve } from "node:path";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyStatic from "@fastify/static";
import { swaggerConfig } from "./swagger/config";
import { swaggerUIConfig } from "./swagger/uiConfig";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = fastify();

app.register(fastifyStatic, {
    root: resolve(__dirname, "public")
});

app.register(fastifySwagger, swaggerConfig);
app.register(fastifySwaggerUi, swaggerUIConfig);

app.register(fastifyAutoload, {
    dir: join(__dirname, "routes")
});


app.listen({ port: PORT }).then(() => {
    console.log(`Server is running on http://localhost:${PORT}/`);
    console.log(`API docs is running on http://localhost:${PORT}/api-docs`);
});