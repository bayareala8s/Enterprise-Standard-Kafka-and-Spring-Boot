import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './user.entity'; // make sure to import your User entity

@Module({
  imports: [TypeOrmModule.forFeature([User])], // provide your User entity here
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
