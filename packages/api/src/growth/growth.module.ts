import { Module } from '@nestjs/common';
import { GrowthService } from './growth.service';
import { GrowthController } from './growth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GrowthSchema } from './schema/growth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Growth', schema: GrowthSchema }]),
  ],
  providers: [GrowthService],
  controllers: [GrowthController],
})
export class GrowthModule {}
