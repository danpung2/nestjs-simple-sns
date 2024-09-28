import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './service/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Reactions, ReactionsSchema } from 'src/reactions/reactions.schema';

@Module({
  imports: [
    MulterModule.register({
        dest: "./upload",
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }, { name: Reactions.name, schema: ReactionsSchema }]), 
    forwardRef(() => AuthModule),
],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
