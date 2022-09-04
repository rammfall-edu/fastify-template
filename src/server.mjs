import initServer from './index.mjs';

(async () => {
  try {
    const server = await initServer();
    await server.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
  } catch (err) {
    console.log(err);
  }
})();
