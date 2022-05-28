import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { CommunitySchema } from './schema/community.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Community', schema: CommunitySchema }]),
  ],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
