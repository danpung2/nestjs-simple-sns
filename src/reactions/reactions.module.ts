import { Module } from '@nestjs/common';
import { ReactionsController } from './controller/reactions.controller';
import { ReactionsService } from './service/reactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reactions, ReactionsSchema } from './reactions.schema';
import { ReactionsRepository } from './reactions.repository';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reactions.name, schema: ReactionsSchema }]),
    CatsModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService, ReactionsRepository],
})
export class ReactionsModule {}
