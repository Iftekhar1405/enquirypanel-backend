import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
// This export is necessary for Vercel serverless deployment
export default async (req, res) => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  await app.listen(3000);
  app.getHttpAdapter().getInstance().use(req, res); // Handles request and response
};
