import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeaderModule } from './header/header.module';
import { GrowthModule } from './growth/growth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    HeaderModule,
    GrowthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
