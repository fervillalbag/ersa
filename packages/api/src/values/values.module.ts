import { Module } from '@nestjs/common';
import { ValuesService } from './values.service';
import { ValuesController } from './values.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ValueSchema } from './schema/values.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Value', schema: ValueSchema }]),
  ],
  providers: [ValuesService],
  controllers: [ValuesController],
})
export class ValuesModule {}
