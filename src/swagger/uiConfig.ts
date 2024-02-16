import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerUIConfig : FastifySwaggerUiOptions = {
    routePrefix: "/api-docs",
    theme: {
        title: "Validation API docs"
    },
    uiConfig: {
        onComplete: () => {
            const topbarWrapper = document.querySelector(".topbar-wrapper") as HTMLDivElement | undefined;
            const topbarLink = topbarWrapper?.querySelector("a.link");

            if (topbarWrapper && topbarLink) {
                topbarWrapper.removeChild(topbarLink);

                topbarWrapper.style.cssText=`
                display: flex;
                flex-direction: row-reverse;
            `;

            const title = document.createElement("h1");
            title.style.cssText= `
                font-size: 20px;
                color: #FFFFFF;
                margin-right: 20px;
            `;
            title.insertAdjacentText("beforeend", "Validation API");
            topbarWrapper?.appendChild(title);
            } 
        },
    }
};