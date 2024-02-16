import { SwaggerOptions } from "@fastify/swagger";


export const swaggerConfig : SwaggerOptions = {
    openapi: {
        info: {
            version: "3.1.0",
            title: "Validation API (JS)",
            description: "Validation API create with Fastify by Fernando de Barros",
            contact: {
                name: "Fernando de Barros",
                email: "fdebarros0910-2004@hotmail.com",
                url: "https://github.com/fernandobarrosd"
            }
        }
    },
    swagger: {
        tags: [
            { name: "Validation" }
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        definitions: {
            ResponseSuccess: {
                properties: {
                    message: {
                        type: "string"
                    },
                    pattern: {
                        type: "string"
                    }
                }
            },
            ResponseError: {
                properties: {
                    message: {
                        type: "string"
                    },
                    statusCode: {
                        type: "integer"
                    }
                }
            },
            ValidationBody: {
                properties: {
                    pattern: {
                        type: "string"
                    }
                }
            }
        }
    }
};