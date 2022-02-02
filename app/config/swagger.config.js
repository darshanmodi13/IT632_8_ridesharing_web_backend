const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SE Backend",
    description: "All Apis for integration",
    version: "0.0.1",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
    // {
    //   url: "https://woc4-darshan-modi.herokuapp.com",
    //   description: "Testing Server",
    // },
  ],
  tags: [
    {
      name: "Auth", // name of a tag
      description: "API to manage Authentication",
    },
    {
      name: "User", // name of a tag
      description: "API to manage User",
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "jwt",
      },
      // JWT: {
      //   type: "http",
      //   scheme: "bearer",
      //   bearerFormat: "JWT",
      //   name: "Authentication",
      //   in: "header",
      // },
    },
  },
  //  if security required globally
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
};

const options = {
  swaggerDefinition,
  // Paths to files(relative to root directory) containing OpenAPI definitions
  apis: ["./app/routes/*.js"],
};

module.exports = options;
