import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BlogModule,
    MongooseModule.forRoot(process.env.DB_PATH),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
