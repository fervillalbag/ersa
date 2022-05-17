import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HeaderService } from './header.service';
import { HeaderController } from './header.controller';
import { HeaderSchema } from './schema/header.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Header', schema: HeaderSchema }]),
  ],
  providers: [HeaderService],
  controllers: [HeaderController],
})
export class HeaderModule {}
