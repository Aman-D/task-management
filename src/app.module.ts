import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const typeOrmOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD') as string,
          database: configService.get('DB_DATABASE'),
          synchronize: true,
          autoLoadEntities: true,
        };
        return typeOrmOptions;
      },
    }),
    TaskModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
