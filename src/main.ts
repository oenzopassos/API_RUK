import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: ['http://localhost:3000', 'https://web-ruk.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true, 
    });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
}
bootstrap();