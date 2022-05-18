import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeaderModule } from './header/header.module';
import { GrowthModule } from './growth/growth.module';
import { ValuesModule } from './values/values.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AboutModule } from './about/about.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    HeaderModule,
    GrowthModule,
    ValuesModule,
    ReviewsModule,
    AboutModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
