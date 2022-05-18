import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { AboutSchema } from './schema/about.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'About', schema: AboutSchema }]),
  ],
  providers: [AboutService],
  controllers: [AboutController],
})
export class AboutModule {}
