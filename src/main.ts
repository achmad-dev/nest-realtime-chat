import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:3001', // Replace with your frontend URL
      credentials: true,
    }),
  );

  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);
}
bootstrap();
