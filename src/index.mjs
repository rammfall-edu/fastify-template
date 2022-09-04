import Fastify from 'fastify';

const initServer = async () => {
  const server = Fastify({
    logger: true,
  });

  await server.register(import('@fastify/cors'));
  await server.register(import('@fastify/multipart'), {
    addToBody: true,
  });
  await server.register(import('@fastify/cookie'));
  await server.register(import('@fastify/swagger'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Bank API doc',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });

  server.get(
    '/hello',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            foo: {
              type: 'string',
              minLength: 2,
              maxLength: 10,
            },
            bar: {
              type: 'string',
              minLength: 2,
              maxLength: 10,
            },
          },
        },
        response: {
          200: {
            type: 'string',
          },
        },
      },
    },
    (request, reply) => {
      return reply.send('world');
    }
  );

  return server;
};

export default initServer;
