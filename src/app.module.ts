import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [UserModule, FinanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
