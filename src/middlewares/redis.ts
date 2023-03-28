import { Request, Response, NextFunction, Send } from 'express';
import Redis from 'ioredis';

const redisClient = new Redis(
    Number( process.env.REDIS_PORT ) ?? 6379, // Redis port
    process.env.REDIS_HOST ?? "localhost"
); // cria uma instância do cliente Redis

function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.originalUrl; // a chave do cache é a URL da requisição

  redisClient.get(key, (err, cachedData) => {
    if (err) {
      console.error(err);
      return next();
    }

    if (cachedData) {
      // se a chave já estiver no cache, retorna a resposta em cache
      const cachedResponse = JSON.parse(cachedData);
      console.log('redis response');
      return res.json(cachedResponse);
    }

    // caso contrário, continua com a execução da requisição e armazena a resposta no cache
    const originalJson = res.json; // salva a função json original para chamar mais tarde
    res.json = (data) : any => {
      redisClient.set(key, JSON.stringify(data), 'EX', 600); // armazena a resposta no cache por 10 minutos
      res.json = originalJson;
      return res.json(data)
    };

    next();
  });
}

export default cacheMiddleware;