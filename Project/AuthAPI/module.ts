import { Module } from '@nestjs/common';
import { AuthModel } from './authGuard.ts/auth.model';
import { UsersModel } from './users/user.model';
import { DatabaseContext } from './config/dbContext';

@Module({
  imports: [AuthModel, UsersModel, DatabaseContext],
})
export class AppModule {}