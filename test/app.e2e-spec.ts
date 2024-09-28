import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AuthModule } from '../src/auth/auth.module';
import { CatsModule } from '../src/cats/cats.module';
import { ReactionsModule } from '../src/reactions/reactions.module';

describe('App', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CatsModule,
        AuthModule,
        ReactionsModule,
      ],
      controllers: [AppController],
      providers: [AppService]
    }).compile();
    
    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  test("0. AppTest Setting", async() => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("health check", () => {
    test("test", async() => {
        const res = controller.healthCheck();
        console.log(res);
    })
  })

});
