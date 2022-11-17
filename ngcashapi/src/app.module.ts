import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts/entities/accounts.entity';
import { AccountsModule } from './accounts/modules/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Transactions } from './transactions/entities/transactions.entity';
import { TransactionsModule } from './transactions/modules/transactions.module';
import { Users } from './users/entities/users.entity';
import { UsersModule } from './users/modules/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'gen123',
    database: 'ngcash_db',
    entities: [Accounts, Users, Transactions],
    synchronize: true
  }),
  UsersModule,
  AccountsModule,
  TransactionsModule,
  AuthModule,
  //JwtModule.register({
  //  secret: 'secret',
  //  signOptions: {expiresIn: '1d'}
  //})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
