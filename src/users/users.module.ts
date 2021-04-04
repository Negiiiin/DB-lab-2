import { Module } from '@nestjs/common';
import { UserServices } from './users.service';
import { UserController } from './users.controller';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserServices],
})
export class UserModule { }