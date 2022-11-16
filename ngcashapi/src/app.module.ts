import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts/entities/accounts.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transactions } from './transactions/entities/transactions.entity';
import { Users } from './users/entities/users.entity';

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
  //Controllers
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
