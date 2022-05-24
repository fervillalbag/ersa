import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerSchema } from './schema/banner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Banner', schema: BannerSchema }]),
  ],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
