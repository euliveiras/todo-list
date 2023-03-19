import { Module } from '@nestjs/common';
import { HttpController } from './controllers/http.controller';

@Module({
  imports: [],
  controllers: [HttpController],
})
export class HttpModule {}
